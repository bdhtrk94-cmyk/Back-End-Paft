import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

export async function addMissingHeavyDutyProducts(dataSource: DataSource) {
  const contentRepository = dataSource.getRepository(Content);

  const missingProducts = [
    // M4 Heavy Duty Product
    { page: 'plastic-pallets', section: 'product-m4', key: 'product-name', value: 'M4 Heavy Duty Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-m4', key: 'dimensions', value: '1200 × 1000 × 150 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-m4', key: 'design', value: '3 SKID', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-m4', key: 'static-load', value: 'Up to 9.0 Tons', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-m4', key: 'dynamic-load', value: 'Up to 3.5 Tons', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-m4', key: 'rack-load', value: 'Up to 1.8 Tons', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-m4', key: 'expected-life', value: 'Up to 10 Years', sortOrder: 7 },

    // M5 Heavy Duty Product
    { page: 'plastic-pallets', section: 'product-m5', key: 'product-name', value: 'M5 Heavy Duty Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-m5', key: 'dimensions', value: '1200 × 800 × 150 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-m5', key: 'design', value: '3 SKID', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-m5', key: 'static-load', value: 'Up to 8.5 Tons', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-m5', key: 'dynamic-load', value: 'Up to 3.2 Tons', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-m5', key: 'rack-load', value: 'Up to 1.6 Tons', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-m5', key: 'expected-life', value: 'Up to 10 Years', sortOrder: 7 },

    // M6 Heavy Duty Product
    { page: 'plastic-pallets', section: 'product-m6', key: 'product-name', value: 'M6 Heavy Duty Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-m6', key: 'dimensions', value: '1000 × 800 × 150 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-m6', key: 'design', value: '3 SKID', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-m6', key: 'static-load', value: 'Up to 7.5 Tons', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-m6', key: 'dynamic-load', value: 'Up to 2.8 Tons', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-m6', key: 'rack-load', value: 'Up to 1.4 Tons', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-m6', key: 'expected-life', value: 'Up to 10 Years', sortOrder: 7 },

    // M7 Heavy Duty Product
    { page: 'plastic-pallets', section: 'product-m7', key: 'product-name', value: 'M7 Heavy Duty Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-m7', key: 'dimensions', value: '1200 × 1200 × 150 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-m7', key: 'design', value: '3 SKID', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-m7', key: 'static-load', value: 'Up to 12.0 Tons', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-m7', key: 'dynamic-load', value: 'Up to 4.5 Tons', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-m7', key: 'rack-load', value: 'Up to 2.2 Tons', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-m7', key: 'expected-life', value: 'Up to 10 Years', sortOrder: 7 },

    // M8 Heavy Duty Product
    { page: 'plastic-pallets', section: 'product-m8', key: 'product-name', value: 'M8 Heavy Duty Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-m8', key: 'dimensions', value: '1100 × 1100 × 150 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-m8', key: 'design', value: '3 SKID', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-m8', key: 'static-load', value: 'Up to 9.5 Tons', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-m8', key: 'dynamic-load', value: 'Up to 3.8 Tons', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-m8', key: 'rack-load', value: 'Up to 1.9 Tons', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-m8', key: 'expected-life', value: 'Up to 10 Years', sortOrder: 7 },

    // M9 Heavy Duty Product
    { page: 'plastic-pallets', section: 'product-m9', key: 'product-name', value: 'M9 Heavy Duty Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-m9', key: 'dimensions', value: '800 × 1200 × 150 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-m9', key: 'design', value: '3 SKID', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-m9', key: 'static-load', value: 'Up to 7.0 Tons', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-m9', key: 'dynamic-load', value: 'Up to 2.5 Tons', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-m9', key: 'rack-load', value: 'Up to 1.2 Tons', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-m9', key: 'expected-life', value: 'Up to 10 Years', sortOrder: 7 },
  ];

  await contentRepository.save(missingProducts);
  console.log('Missing heavy duty products (M4-M9) added successfully!');
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
      await addMissingHeavyDutyProducts(dataSource);
      await dataSource.destroy();
    } catch (error) {
      console.error('Error adding missing heavy duty products:', error);
      process.exit(1);
    }
  });
}