import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

export async function addCompletePlasticPalletsContent(dataSource: DataSource) {
  const contentRepository = dataSource.getRepository(Content);

  // Delete existing plastic-pallets content to start fresh
  await contentRepository.delete({ page: 'plastic-pallets' });

  const completeContent = [
    // Heavy Duty Hero Section
    { page: 'plastic-pallets', section: 'heavy-duty-hero', key: 'heavy-duty-title', value: 'Heavy Duty', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'heavy-duty-hero', key: 'heavy-duty-highlight', value: 'Pallets', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'heavy-duty-hero', key: 'heavy-duty-description', value: 'PAFT Heavy-Duty Pallets are designed to deliver the highest value for money in the MENA region, offering exceptional durability with the lowest annual breakage rates. Constructed from premium composite virgin materials and reinforced with metal bars, these pallets have a lifespan of 10+ years and come with a 5-year manufacturing warranty.', sortOrder: 3 },

    // Info Cards Section
    { page: 'plastic-pallets', section: 'info-cards', key: 'design-title', value: 'Design', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'info-cards', key: 'design-content', value: 'Best used for racking system applications with exceptional load capacity and minimal deflection. Engineered for maximum durability and performance.', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'info-cards', key: 'material-title', value: 'Material', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'info-cards', key: 'material-content', value: 'Can be produced in 6 different formulas with HDPE/PP • High impact composite material • Virgin Material • Partially recycled materials plus enhancement additives (Optional) • Elastomer and UV protection additives (Optional) • Electro-static coated steel reinforcement bars • Certified food grade material • Certified Hygienic design', sortOrder: 4 },

    // Video Section
    { page: 'plastic-pallets', section: 'video', key: 'video-title', value: 'Product', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'video', key: 'video-highlight', value: 'Testing', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'video', key: 'video-description', value: 'Watch our rigorous quality testing in action', sortOrder: 3 },

    // Light Duty Hero Section
    { page: 'plastic-pallets', section: 'light-duty-hero', key: 'light-duty-title', value: 'Light Duty', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'light-duty-hero', key: 'light-duty-highlight', value: 'Pallets', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'light-duty-hero', key: 'light-duty-description', value: 'Several pallets starting at 7kg/pallet. Made from recycled plastic, perfect for single-use applications. Unlike wooden pallets, these do not require special treatments, meeting all hygienic and environmental standards. Waterproof and competitively priced starting from just 8 USD/piece.', sortOrder: 3 },

    // Light Duty Features
    { page: 'plastic-pallets', section: 'light-duty-features', key: 'feature1', value: 'Lightweight Design', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'light-duty-features', key: 'feature2', value: 'Cost Effective', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'light-duty-features', key: 'feature3', value: 'Hygienic Standards', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'light-duty-features', key: 'feature4', value: 'Waterproof', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'light-duty-features', key: 'feature5', value: 'Eco-Friendly', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'light-duty-features', key: 'feature6', value: 'Export Grade', sortOrder: 6 },

    // Rental Hero Section
    { page: 'plastic-pallets', section: 'rental-hero', key: 'rental-title', value: 'Rental', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'rental-hero', key: 'rental-highlight', value: 'Pallets', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'rental-hero', key: 'rental-description', value: 'PAFT offers a unique, innovative approach to pallet rental services in Egypt and the MENA region. Our rental program provides businesses with access to high-quality plastic pallets without the upfront investment, offering flexible terms and comprehensive maintenance support.', sortOrder: 3 },

    // CTA Section
    { page: 'plastic-pallets', section: 'cta', key: 'cta-title', value: 'Need', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'cta', key: 'cta-highlight', value: 'Custom Solutions?', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'cta', key: 'cta-description', value: 'We can manufacture pallets according to your specific requirements', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'cta', key: 'cta-button1-text', value: 'Request a Quote →', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'cta', key: 'cta-button2-text', value: 'Contact Our Team', sortOrder: 5 },

    // Product Specification Labels
    { page: 'plastic-pallets', section: 'product-specs', key: 'dimensions-label', value: 'Dimensions', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-specs', key: 'design-label', value: 'Design', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-specs', key: 'weight-label', value: 'Weight', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-specs', key: 'static-load-label', value: 'Static Load', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-specs', key: 'dynamic-load-label', value: 'Dynamic Load', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-specs', key: 'rack-load-label', value: 'Rack Load', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-specs', key: 'expected-life-label', value: 'Expected Life', sortOrder: 7 },

    // M1 Heavy Duty Product
    { page: 'plastic-pallets', section: 'product-m1', key: 'product-name', value: 'M1 Heavy Duty Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-m1', key: 'dimensions', value: '1000 × 1200 × 150 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-m1', key: 'design', value: '3 SKID', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-m1', key: 'static-load', value: 'Up to 10.0 Tons', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-m1', key: 'dynamic-load', value: 'Up to 4.0 Tons', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-m1', key: 'rack-load', value: 'Up to 1.75 Tons', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-m1', key: 'expected-life', value: 'Up to 10 Years', sortOrder: 7 },

    // M2 Heavy Duty Product
    { page: 'plastic-pallets', section: 'product-m2', key: 'product-name', value: 'M2 Heavy Duty Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-m2', key: 'dimensions', value: '1100 × 1300 × 150 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-m2', key: 'design', value: '3 SKID', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-m2', key: 'static-load', value: 'Up to 8.0 Tons', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-m2', key: 'dynamic-load', value: 'Up to 3.0 Tons', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-m2', key: 'rack-load', value: 'Up to 2 Tons', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-m2', key: 'expected-life', value: 'Up to 10 Years', sortOrder: 7 },

    // Double Deck Light Product
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'product-name', value: 'Double Deck Light Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'dimensions', value: '1000 × 1200 × 130 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'design', value: 'Double Deck', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'weight', value: '7.2 kg', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'static-load', value: '1 Ton', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'dynamic-load', value: '1 Ton', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'rack-load', value: 'Non-Rackable', sortOrder: 7 },
    { page: 'plastic-pallets', section: 'product-double-deck', key: 'expected-life', value: 'Export Grade', sortOrder: 8 },

    // 9 Leg Light Product
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'product-name', value: '9 Leg Light Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'dimensions', value: '1000 × 1200 × 140 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'design', value: '9-Leg', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'weight', value: '5.5 kg', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'static-load', value: '0.75 Ton', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'dynamic-load', value: '0.75 Ton', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'rack-load', value: 'Non-Rackable', sortOrder: 7 },
    { page: 'plastic-pallets', section: 'product-9-leg', key: 'expected-life', value: 'Export Grade', sortOrder: 8 },

    // Rental Product
    { page: 'plastic-pallets', section: 'product-rental', key: 'product-name', value: 'Rental Pallet', sortOrder: 1 },
    { page: 'plastic-pallets', section: 'product-rental', key: 'dimensions', value: '1000 × 1200 × 150 mm', sortOrder: 2 },
    { page: 'plastic-pallets', section: 'product-rental', key: 'design', value: 'Heavy Duty', sortOrder: 3 },
    { page: 'plastic-pallets', section: 'product-rental', key: 'static-load', value: 'Up to 10.0 Tons', sortOrder: 4 },
    { page: 'plastic-pallets', section: 'product-rental', key: 'dynamic-load', value: 'Up to 4.0 Tons', sortOrder: 5 },
    { page: 'plastic-pallets', section: 'product-rental', key: 'rack-load', value: 'Up to 2.0 Tons', sortOrder: 6 },
    { page: 'plastic-pallets', section: 'product-rental', key: 'expected-life', value: '10+ Years', sortOrder: 7 },
  ];

  await contentRepository.save(completeContent);
  console.log('Complete plastic pallets content added successfully!');
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
      await addCompletePlasticPalletsContent(dataSource);
      await dataSource.destroy();
    } catch (error) {
      console.error('Error adding complete plastic pallets content:', error);
      process.exit(1);
    }
  });
}