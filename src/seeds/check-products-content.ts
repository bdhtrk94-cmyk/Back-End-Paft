import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

async function checkProductsContent() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'paft_cms',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    const contentRepository = dataSource.getRepository(Content);

    console.log('🔍 Checking plastic-pallets products content...\n');

    const productSections = ['product-m1', 'product-m2', 'product-double-deck', 'product-9-leg', 'product-rental'];
    
    for (const section of productSections) {
      const content = await contentRepository.find({
        where: { page: 'plastic-pallets', section },
        order: { sortOrder: 'ASC' }
      });
      
      console.log(`📦 ${section.toUpperCase()}:`);
      if (content.length === 0) {
        console.log('   ❌ No content found');
      } else {
        content.forEach(item => {
          console.log(`   ✅ ${item.key}: ${item.value}`);
        });
      }
      console.log('');
    }

    await dataSource.destroy();
  } catch (error) {
    console.error('Error checking products content:', error);
    process.exit(1);
  }
}

checkProductsContent();