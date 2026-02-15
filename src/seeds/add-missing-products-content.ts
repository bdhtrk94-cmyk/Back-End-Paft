import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

export async function addMissingProductsContent(dataSource: DataSource) {
  const contentRepository = dataSource.getRepository(Content);

  const missingProductsContent = [
    // M4 Heavy Duty Product Specifications
    {
      page: 'plastic-pallets',
      section: 'product-m4',
      key: 'product-m4-product-name',
      value: 'M4 Heavy Duty Pallet',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m4',
      key: 'product-m4-dimensions',
      value: '1000 × 1200 × 150 mm',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m4',
      key: 'product-m4-design',
      value: 'Double Face',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m4',
      key: 'product-m4-static-load',
      value: 'Up to 6.0 Tons',
      sortOrder: 4,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m4',
      key: 'product-m4-dynamic-load',
      value: 'Up to 2.5 Tons',
      sortOrder: 5,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m4',
      key: 'product-m4-rack-load',
      value: 'Up to 1.5 Tons',
      sortOrder: 6,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m4',
      key: 'product-m4-expected-life',
      value: 'Up to 10 Years',
      sortOrder: 7,
    },

    // M5 Heavy Duty Product Specifications
    {
      page: 'plastic-pallets',
      section: 'product-m5',
      key: 'product-m5-product-name',
      value: 'M5 Heavy Duty Pallet',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m5',
      key: 'product-m5-dimensions',
      value: '800 × 1200 × 150 mm',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m5',
      key: 'product-m5-design',
      value: '3 SKID',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m5',
      key: 'product-m5-static-load',
      value: 'Up to 8.0 Tons',
      sortOrder: 4,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m5',
      key: 'product-m5-dynamic-load',
      value: 'Up to 3 Tons',
      sortOrder: 5,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m5',
      key: 'product-m5-rack-load',
      value: 'Up to 1.75 Tons',
      sortOrder: 6,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m5',
      key: 'product-m5-expected-life',
      value: 'Up to 10 Years',
      sortOrder: 7,
    },

    // M6 Heavy Duty Product Specifications
    {
      page: 'plastic-pallets',
      section: 'product-m6',
      key: 'product-m6-product-name',
      value: 'M6 Heavy Duty Pallet',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m6',
      key: 'product-m6-dimensions',
      value: '1000 × 1200 × 150 mm',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m6',
      key: 'product-m6-design',
      value: '3 SKID',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m6',
      key: 'product-m6-static-load',
      value: 'Up to 10.0 Tons',
      sortOrder: 4,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m6',
      key: 'product-m6-dynamic-load',
      value: 'Up to 4.0 Tons',
      sortOrder: 5,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m6',
      key: 'product-m6-rack-load',
      value: 'Up to 2.0 Tons',
      sortOrder: 6,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m6',
      key: 'product-m6-expected-life',
      value: 'Up to 10 Years',
      sortOrder: 7,
    },

    // M7 Heavy Duty Product Specifications
    {
      page: 'plastic-pallets',
      section: 'product-m7',
      key: 'product-m7-product-name',
      value: 'M7 Heavy Duty Pallet',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m7',
      key: 'product-m7-dimensions',
      value: '1200 × 1200 × 150 mm',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m7',
      key: 'product-m7-design',
      value: '3 SKID',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m7',
      key: 'product-m7-static-load',
      value: 'Up to 10.0 Tons',
      sortOrder: 4,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m7',
      key: 'product-m7-dynamic-load',
      value: 'Up to 4.0 Tons',
      sortOrder: 5,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m7',
      key: 'product-m7-rack-load',
      value: 'Up to 2.0 Tons',
      sortOrder: 6,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m7',
      key: 'product-m7-expected-life',
      value: 'Up to 10 Years',
      sortOrder: 7,
    },

    // M8 Heavy Duty Product Specifications
    {
      page: 'plastic-pallets',
      section: 'product-m8',
      key: 'product-m8-product-name',
      value: 'M8 Heavy Duty Pallet',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m8',
      key: 'product-m8-dimensions',
      value: '1140 × 1140 × 150 mm',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m8',
      key: 'product-m8-design',
      value: '3 SKID',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m8',
      key: 'product-m8-static-load',
      value: 'Up to 10.0 Tons',
      sortOrder: 4,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m8',
      key: 'product-m8-dynamic-load',
      value: 'Up to 4.0 Tons',
      sortOrder: 5,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m8',
      key: 'product-m8-rack-load',
      value: 'Up to 2 Tons',
      sortOrder: 6,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m8',
      key: 'product-m8-expected-life',
      value: 'Up to 10 Years',
      sortOrder: 7,
    },

    // M9 Heavy Duty Product Specifications
    {
      page: 'plastic-pallets',
      section: 'product-m9',
      key: 'product-m9-product-name',
      value: 'M9 Heavy Duty Pallet',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m9',
      key: 'product-m9-dimensions',
      value: '1100 × 1100 × 150 mm',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m9',
      key: 'product-m9-design',
      value: '3 SKID',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m9',
      key: 'product-m9-static-load',
      value: 'Up to 10.0 Tons',
      sortOrder: 4,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m9',
      key: 'product-m9-dynamic-load',
      value: 'Up to 4.0 Tons',
      sortOrder: 5,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m9',
      key: 'product-m9-rack-load',
      value: 'Up to 2 Tons',
      sortOrder: 6,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m9',
      key: 'product-m9-expected-life',
      value: 'Up to 10 Years',
      sortOrder: 7,
    },
  ];

  // Check if any of these products already exist
  const existingM4 = await contentRepository.findOne({
    where: { page: 'plastic-pallets', section: 'product-m4', key: 'product-m4-product-name' },
  });

  if (existingM4) {
    console.log('Missing products content already exists, skipping...');
    return;
  }

  await contentRepository.save(missingProductsContent);
  console.log('Missing products content added successfully!');
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
      await addMissingProductsContent(dataSource);
      await dataSource.destroy();
    } catch (error) {
      console.error('Error adding missing products content:', error);
      process.exit(1);
    }
  });
}