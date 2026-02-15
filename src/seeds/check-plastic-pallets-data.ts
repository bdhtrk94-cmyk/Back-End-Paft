import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

export async function checkPlasticPalletsData(dataSource: DataSource) {
  const contentRepository = dataSource.getRepository(Content);

  console.log('Checking plastic-pallets content...');

  const content = await contentRepository.find({
    where: { page: 'plastic-pallets' },
    order: { section: 'ASC', sortOrder: 'ASC' }
  });

  console.log(`Found ${content.length} content items for plastic-pallets page:`);
  
  const sections = {};
  content.forEach(item => {
    if (!sections[item.section]) {
      sections[item.section] = {};
    }
    sections[item.section][item.key] = item.value;
  });

  console.log('\nContent by sections:');
  Object.keys(sections).forEach(section => {
    console.log(`\n${section}:`);
    Object.keys(sections[section]).forEach(key => {
      console.log(`  ${key}: ${sections[section][key].substring(0, 50)}${sections[section][key].length > 50 ? '...' : ''}`);
    });
  });
}

// Run this script directly
if (require.main === module) {
  import('typeorm').then(async ({ DataSource }) => {
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
      await checkPlasticPalletsData(dataSource);
      await dataSource.destroy();
    } catch (error) {
      console.error('Error checking plastic-pallets data:', error);
      process.exit(1);
    }
  });
}