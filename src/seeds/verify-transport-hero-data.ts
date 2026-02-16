import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'paft_cms',
  entities: [Content],
  synchronize: false,
});

async function verifyTransportHeroData() {
  try {
    console.log('🔌 Connecting to database...');
    await dataSource.initialize();
    console.log('✅ Database connection established');

    const contentRepository = dataSource.getRepository(Content);

    console.log('🔍 Checking transport-logistics hero content...');
    const heroContent = await contentRepository.find({
      where: { 
        page: 'transport-logistics',
        section: 'hero'
      },
      order: { sortOrder: 'ASC' }
    });

    console.log(`📊 Found ${heroContent.length} hero content items:`);
    heroContent.forEach(item => {
      console.log(`  - ${item.key}: "${item.value}"`);
    });

    console.log('\n🔍 Checking all transport-logistics content...');
    const allContent = await contentRepository.find({
      where: { page: 'transport-logistics' },
      order: { section: 'ASC', sortOrder: 'ASC' }
    });

    console.log(`📊 Found ${allContent.length} total content items for transport-logistics:`);
    const sections = {};
    allContent.forEach(item => {
      if (!sections[item.section]) {
        sections[item.section] = [];
      }
      sections[item.section].push(`${item.key}: "${item.value}"`);
    });

    Object.keys(sections).forEach(section => {
      console.log(`\n📁 Section: ${section}`);
      sections[section].forEach(item => {
        console.log(`  - ${item}`);
      });
    });

  } catch (error) {
    console.error('❌ Error verifying content:', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('🔌 Database connection closed');
    }
  }
}

verifyTransportHeroData();