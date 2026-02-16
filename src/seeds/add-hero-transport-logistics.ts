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

const heroContent = [
  // Hero Section Data for Transport Logistics Page
  { page: 'transport-logistics', section: 'hero', key: 'badge-text', value: 'PAFT Transport Solutions', sortOrder: 1 },
  { page: 'transport-logistics', section: 'hero', key: 'title', value: 'Transport & Logistics Excellence', sortOrder: 2 },
  { page: 'transport-logistics', section: 'hero', key: 'description', value: 'Premium foldable IBCs, reusable plastic crates, sheet separators, and gallon racks designed for maximum efficiency and sustainability in modern supply chains.', sortOrder: 3 },
];

async function addHeroTransportLogisticsContent() {
  try {
    console.log('🔌 Connecting to database...');
    await dataSource.initialize();
    console.log('✅ Database connection established');

    const contentRepository = dataSource.getRepository(Content);

    console.log('🧹 Clearing existing hero section content for transport-logistics...');
    await contentRepository.delete({ 
      page: 'transport-logistics', 
      section: 'hero' 
    });
    console.log('✅ Existing hero content cleared');

    console.log('📦 Adding hero section content for transport-logistics...');
    
    for (const contentData of heroContent) {
      const content = contentRepository.create(contentData);
      await contentRepository.save(content);
      console.log(`✅ Added: ${content.section} - ${content.key} = "${content.value}"`);
    }

    console.log(`\n🎉 Successfully added ${heroContent.length} hero content items!`);

  } catch (error) {
    console.error('❌ Error adding hero content:', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('🔌 Database connection closed');
    }
  }
}

addHeroTransportLogisticsContent();