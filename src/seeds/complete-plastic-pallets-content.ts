import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

export async function completeProductsContent(dataSource: DataSource) {
  const contentRepository = dataSource.getRepository(Content);

  // Delete existing product content to avoid duplicates
  const sectionsToDelete = ['product-m1', 'product-m2', 'product-m4', 'product-m5', 'product-m6', 'product-m7', 'product-m8', 'product-m9', 'product-double-deck', 'product-9-leg', 'product-rental'];
  
  for (const section of sectionsToDelete) {
    await contentRepository.delete({ 
      page: 'plastic-pallets',
      section: section
    });
  }

  const allProductsContent = [
    // M1 Heavy Duty Product
    { page: 'plastic-pallets', section: 'product-m1', key: 'product-m1-product-name', value: 'M1 Heavy Duty Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-m1', key: 'product-m1-dimensions', value: '1000 × 1200 × 150 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-m1', key: 'product-m1-design', value: '3 SKID', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-m1', key: 'product-m1-static-load', value: 'Up to 10.0 Tons', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-m1', key: 'product-m1-dynamic-load', value: 'Up to 4.0 Tons', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-m1', key: 'product-m1-rack-load', value: 'Up to 1.75 Tons', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-m1', key: 'product-m1-expected-life', value: 'Up to 10 Years', sortOrder: 7 },

    // M2 Heavy Duty Product
    { page: 'plastic-pallets', section: 'product-m2', key: 'product-m2-product-name', value: 'M2 Heavy Duty Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-m2', key: 'product-m2-dimensions', value: '1100 × 1300 × 150 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-m2', key: 'product-m2-design', value: '3 SKID', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-m2', key: 'product-m2-static-load', value: 'Up to 8.0 Tons', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-m2', key: 'product-m2-dynamic-load', value: 'Up to 3.0 Tons', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-m2', key: 'product-m2-rack-load', value: 'Up to 2 Tons', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-m2', key: 'product-m2-expected-life', value: 'Up to 10 Years', sortOrder: 7 },

    // Double Deck Light Product
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'product-double-deck-product-name', value: 'Double Deck Light Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'product-double-deck-dimensions', value: '1000 × 1200 × 130 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'product-double-deck-design', value: 'Double Deck', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'product-double-deck-weight', value: '7.2 kg', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'product-double-deck-static-load', value: '1 Ton', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'product-double-deck-dynamic-load', value: '1 Ton', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'product-double-deck-rack-load', value: 'Non-Rackable', sortOrder: 7 },
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'product-double-deck-expected-life', value: 'Export Grade', sortOrder: 8 },

    // 9 Leg Light Product
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'product-9-leg-product-name', value: '9 Leg Light Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'product-9-leg-dimensions', value: '1000 × 1200 × 140 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'product-9-leg-design', value: '9-Leg', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'product-9-leg-weight', value: '5.5 kg', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'product-9-leg-static-load', value: '0.75 Ton', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'product-9-leg-dynamic-load', value: '0.75 Ton', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'product-9-leg-rack-load', value: 'Non-Rackable', sortOrder: 7 },
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'product-9-leg-expected-life', value: 'Export Grade', sortOrder: 8 },

    // Rental Product
    { page: 'plastic-pallets', section: 'product-rental', key: 'product-rental-product-name', value: 'Rental Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-rental', key: 'product-rental-dimensions', value: '1000 × 1200 × 150 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-rental', key: 'product-rental-design', value: 'Heavy Duty', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-rental', key: 'product-rental-static-load', value: 'Up to 10.0 Tons', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-rental', key: 'product-rental-dynamic-load', value: 'Up to 4.0 Tons', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-rental', key: 'product-rental-rack-load', value: 'Up to 2.0 Tons', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-rental', key: 'product-rental-expected-life', value: '10+ Years', sortOrder: 7 },
  ];

  await contentRepository.save(allProductsContent);
  console.log('Complete products content added successfully!');
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
      await completeProductsContent(dataSource);
      await dataSource.destroy();
    } catch (error) {
      console.error('Error adding complete products content:', error);
      process.exit(1);
    }
  });
}