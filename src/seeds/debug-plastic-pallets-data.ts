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

async function debugPlasticPalletsData() {
  await AppDataSource.initialize();
  const contentRepo = AppDataSource.getRepository(Content);
  
  console.log('🔍 Checking plastic-pallets data in database...');
  
  const plasticPalletsContent = await contentRepo.find({
    where: { page: 'plastic-pallets' },
    order: { section: 'ASC', key: 'ASC' }
  });
  
  console.log(`Found ${plasticPalletsContent.length} items`);
  
  // Group by section
  const sections: Record<string, any[]> = {};
  plasticPalletsContent.forEach(item => {
    if (!sections[item.section]) sections[item.section] = [];
    sections[item.section].push({ key: item.key, value: item.value, id: item.id });
  });
  
  Object.keys(sections).sort().forEach(section => {
    console.log(`\n📦 Section: ${section}`);
    sections[section].forEach(item => {
      console.log(`   ${item.key}: '${item.value}' (id: ${item.id})`);
    });
  });
  
  await AppDataSource.destroy();
}

debugPlasticPalletsData().catch(console.error);