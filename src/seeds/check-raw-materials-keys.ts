import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'paft_cms',
  entities: [Content],
  synchronize: false,
});

async function checkKeys() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    const contentRepo = AppDataSource.getRepository(Content);

    const contents = await contentRepo.find({
      where: { page: 'raw-materials' },
      order: { sortOrder: 'ASC' },
    });

    console.log('\n📋 Raw Materials Keys:');
    console.log('='.repeat(80));
    
    contents.forEach((content) => {
      console.log(`Section: ${content.section.padEnd(15)} | Key: ${content.key.padEnd(20)} | Value: ${content.value?.substring(0, 50)}...`);
    });

    console.log('\n✅ Total entries:', contents.length);

    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkKeys();
