import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

export async function seedHomeContent(dataSource: DataSource) {
  const contentRepository = dataSource.getRepository(Content);

  // Check if content already exists
  const existingContent = await contentRepository.findOne({
    where: { page: 'home' },
  });

  if (existingContent) {
    console.log('Home content already exists, skipping seed...');
    return;
  }

  const homeContent = [
    // Business Units Section
    {
      page: 'home',
      section: 'business-units',
      key: 'title',
      value: 'Our Business Units',
      sortOrder: 1,
    },
    {
      page: 'home',
      section: 'business-units',
      key: 'subtitle',
      value: 'Comprehensive solutions across three core divisions',
      sortOrder: 2,
    },
    {
      page: 'home',
      section: 'business-units',
      key: 'unit1-title',
      value: 'Plastic Pallets',
      sortOrder: 3,
    },
    {
      page: 'home',
      section: 'business-units',
      key: 'unit1-description',
      value: 'PAFT heavy-duty plastic pallets are engineered for demanding industrial applications and are backed by a lifetime warranty of up to 10 years. Selected models are designed to handle static loads of up to 10 tons and racked loads of up to 4 tons, delivering exceptional strength, durability, and reliable performance in warehouse and logistics operations.',
      sortOrder: 4,
    },
    {
      page: 'home',
      section: 'business-units',
      key: 'unit1-button-text',
      value: 'Discover more',
      sortOrder: 5,
    },
    {
      page: 'home',
      section: 'business-units',
      key: 'unit2-title',
      value: 'High-Performance Recycled Raw Materials',
      sortOrder: 6,
    },
    {
      page: 'home',
      section: 'business-units',
      key: 'unit2-description',
      value: 'Our innovative recycled raw materials enable clients to transition seamlessly from virgin materials to high-grade, consistent recycled alternatives. These materials are engineered to match and in many cases exceed the performance of virgin raw materials, without compromising on quality, reliability, or sustainability.',
      sortOrder: 7,
    },
    {
      page: 'home',
      section: 'business-units',
      key: 'unit2-button-text',
      value: 'Discover more',
      sortOrder: 8,
    },
    {
      page: 'home',
      section: 'business-units',
      key: 'unit3-title',
      value: 'A New Era of Traceability',
      sortOrder: 9,
    },
    {
      page: 'home',
      section: 'business-units',
      key: 'unit3-description',
      value: 'PAFT iWMS utilizes advanced RFID technology to transform warehouses into fully automated environments, delivering real-time traceability of products, equipment, and operators with instant visibility and control across all operations.',
      sortOrder: 10,
    },
    {
      page: 'home',
      section: 'business-units',
      key: 'unit3-button-text',
      value: 'Discover more',
      sortOrder: 11,
    },
    // Video Hero Section
    {
      page: 'home',
      section: 'video-hero',
      key: 'watch-video-text',
      value: 'Watch Video',
      sortOrder: 1,
    },
  ];

  await contentRepository.save(homeContent);
  console.log('Home content seeded successfully!');
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
      await seedHomeContent(dataSource);
      await dataSource.destroy();
    } catch (error) {
      console.error('Error seeding home content:', error);
      process.exit(1);
    }
  });
}