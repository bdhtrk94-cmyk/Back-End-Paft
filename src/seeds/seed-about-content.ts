import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

export async function seedAboutContent(dataSource: DataSource) {
  const contentRepository = dataSource.getRepository(Content);

  // Check if content already exists
  const existingContent = await contentRepository.findOne({
    where: { page: 'about' },
  });

  if (existingContent) {
    console.log('About content already exists, skipping seed...');
    return;
  }

  const aboutContent = [
    // Hero Section
    {
      page: 'about',
      section: 'hero',
      key: 'badge-text',
      value: 'About PAFT',
      sortOrder: 1,
    },
    {
      page: 'about',
      section: 'hero',
      key: 'title',
      value: 'Our Vision',
      sortOrder: 2,
    },
    {
      page: 'about',
      section: 'hero',
      key: 'description',
      value: 'Be, & be recognized as the pace setters in providing optimal transport logistics & technical packaging technology solutions.',
      sortOrder: 3,
    },

    // Who We Are Section
    {
      page: 'about',
      section: 'who-we-are',
      key: 'badge-text',
      value: 'Who We Are',
      sortOrder: 1,
    },
    {
      page: 'about',
      section: 'who-we-are',
      key: 'title',
      value: 'Packaging Applications & Future Technologies',
      sortOrder: 2,
    },
    {
      page: 'about',
      section: 'who-we-are',
      key: 'paragraph1',
      value: 'PAFT (Packaging Applications & Future Technologies) is a leading provider of innovative supply chain solutions in the MENA region. With a focus on quality, durability, and efficiency, PAFT specializes in the design, manufacturing, and distribution of a wide range of industrial packaging products, including pallets, crates, and intermediate bulk containers (IBC).',
      sortOrder: 3,
    },
    {
      page: 'about',
      section: 'who-we-are',
      key: 'paragraph2',
      value: 'Our commitment to excellence is reflected in our use of premium materials, cutting-edge technology, and our tailored service offerings.',
      sortOrder: 4,
    },
    {
      page: 'about',
      section: 'who-we-are',
      key: 'paragraph3',
      value: 'At PAFT, we understand the challenges faced by industries in managing their supply chains. Our products are engineered to meet the highest standards of durability, hygiene, and environmental compliance, ensuring that your operations run smoothly and efficiently.',
      sortOrder: 5,
    },
    {
      page: 'about',
      section: 'who-we-are',
      key: 'paragraph4',
      value: 'Whether you need heavy-duty pallets that can withstand significant loads, flexible rental solutions, or specialized containers for liquid storage, PAFT has the expertise and products to support your business needs.',
      sortOrder: 6,
    },
    {
      page: 'about',
      section: 'who-we-are',
      key: 'quote',
      value: 'At PAFT, innovation delivered at great value is at the heart of everything we do, making us the trusted partner for businesses across various industries.',
      sortOrder: 7,
    },
    {
      page: 'about',
      section: 'who-we-are',
      key: 'stat1-number',
      value: '10+',
      sortOrder: 8,
    },
    {
      page: 'about',
      section: 'who-we-are',
      key: 'stat1-text',
      value: 'Years Experience',
      sortOrder: 9,
    },
    {
      page: 'about',
      section: 'who-we-are',
      key: 'stat2-number',
      value: 'MENA',
      sortOrder: 10,
    },
    {
      page: 'about',
      section: 'who-we-are',
      key: 'stat2-text',
      value: 'Region Leader',
      sortOrder: 11,
    },

    // Values Section
    {
      page: 'about',
      section: 'values',
      key: 'title',
      value: 'Our Core Values',
      sortOrder: 1,
    },
    {
      page: 'about',
      section: 'values',
      key: 'subtitle',
      value: 'The principles that guide everything we do at PAFT',
      sortOrder: 2,
    },
    {
      page: 'about',
      section: 'values',
      key: 'value1-title',
      value: 'Quality First',
      sortOrder: 3,
    },
    {
      page: 'about',
      section: 'values',
      key: 'value1-description',
      value: 'We never compromise on quality and ensure every product meets the highest international standards.',
      sortOrder: 4,
    },
    {
      page: 'about',
      section: 'values',
      key: 'value2-title',
      value: 'Innovation',
      sortOrder: 5,
    },
    {
      page: 'about',
      section: 'values',
      key: 'value2-description',
      value: 'Continuously pushing boundaries with cutting-edge technology and forward-thinking solutions.',
      sortOrder: 6,
    },
    {
      page: 'about',
      section: 'values',
      key: 'value3-title',
      value: 'Sustainability',
      sortOrder: 7,
    },
    {
      page: 'about',
      section: 'values',
      key: 'value3-description',
      value: 'Committed to environmental responsibility through recyclable materials and eco-friendly processes.',
      sortOrder: 8,
    },
    {
      page: 'about',
      section: 'values',
      key: 'value4-title',
      value: 'Customer Focus',
      sortOrder: 9,
    },
    {
      page: 'about',
      section: 'values',
      key: 'value4-description',
      value: 'Our customers are at the heart of everything we do, driving our innovation and service excellence.',
      sortOrder: 10,
    },

    // CTA Section
    {
      page: 'about',
      section: 'cta',
      key: 'title',
      value: 'Ready to Work With Us?',
      sortOrder: 1,
    },
    {
      page: 'about',
      section: 'cta',
      key: 'description',
      value: "Let's discuss how PAFT can help optimize your logistics operations",
      sortOrder: 2,
    },
    {
      page: 'about',
      section: 'cta',
      key: 'button1-text',
      value: 'Get in Touch →',
      sortOrder: 3,
    },
    {
      page: 'about',
      section: 'cta',
      key: 'button2-text',
      value: 'Browse Products',
      sortOrder: 4,
    },
  ];

  await contentRepository.save(aboutContent);
  console.log('About content seeded successfully!');
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
      await seedAboutContent(dataSource);
      await dataSource.destroy();
    } catch (error) {
      console.error('Error seeding about content:', error);
      process.exit(1);
    }
  });
}