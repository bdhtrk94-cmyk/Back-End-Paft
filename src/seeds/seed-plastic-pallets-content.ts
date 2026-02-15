import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

export async function seedPlasticPalletsContent(dataSource: DataSource) {
  const contentRepository = dataSource.getRepository(Content);

  // Check if content already exists
  const existingContent = await contentRepository.findOne({
    where: { page: 'plastic-pallets' },
  });

  if (existingContent) {
    console.log('Plastic Pallets content already exists, skipping seed...');
    return;
  }

  const plasticPalletsContent = [
    // Heavy Duty Hero Section
    {
      page: 'plastic-pallets',
      section: 'heavy-duty-hero',
      key: 'heavy-duty-title',
      value: 'Heavy Duty',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'heavy-duty-hero',
      key: 'heavy-duty-highlight',
      value: 'Pallets',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'heavy-duty-hero',
      key: 'heavy-duty-description',
      value: 'PAFT Heavy-Duty Pallets are designed to deliver the highest value for money in the MENA region, offering exceptional durability with the lowest annual breakage rates. Constructed from premium composite virgin materials and reinforced with metal bars, these pallets have a lifespan of 10+ years and come with a 5-year manufacturing warranty. PAFT pallets can handle exceptional rack loads of up to 2 tonnes with maximum deflection of 15mm.',
      sortOrder: 3,
    },

    // Info Cards Section
    {
      page: 'plastic-pallets',
      section: 'info-cards',
      key: 'design-title',
      value: 'Design',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'info-cards',
      key: 'design-content',
      value: 'Best used for racking system • Can be reinforced up to 10 metal bars and up to 2.0mm thickness • Compatible with RFID for pallet tracing • Free entry for manual hand pallet • Anti-slip stoppers • Perforated top and bottom • Client logos engraved on both sides • Full traceability solution available',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'info-cards',
      key: 'material-title',
      value: 'Material',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'info-cards',
      key: 'material-content',
      value: 'Can be produced in 6 different formulas with HDPE/PP • High impact composite material • Virgin Material • Partially recycled materials plus enhancement additives (Optional) • Elastomer and UV protection additives (Optional) • Electro-static coated steel reinforcement bars • Certified food grade material • Certified Hygienic design',
      sortOrder: 4,
    },

    // Video Section
    {
      page: 'plastic-pallets',
      section: 'video',
      key: 'title',
      value: 'Product',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'video',
      key: 'highlight',
      value: 'Testing',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'video',
      key: 'description',
      value: 'Watch our rigorous quality testing in action',
      sortOrder: 3,
    },

    // Light Duty Hero Section
    {
      page: 'plastic-pallets',
      section: 'light-duty-hero',
      key: 'title',
      value: 'Light Duty',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'light-duty-hero',
      key: 'highlight',
      value: 'Pallets',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'light-duty-hero',
      key: 'description',
      value: 'Several pallets starting at 7kg/pallet. Made from recycled plastic, perfect for single-use applications. Unlike wooden pallets, these do not require special treatments, meeting all hygienic and environmental standards. Waterproof and competitively priced starting from just 8 USD/piece, ideal for industries with dynamic loads of up to 1.5 tons.',
      sortOrder: 3,
    },

    // Light Duty Info Features
    {
      page: 'plastic-pallets',
      section: 'light-duty-info',
      key: 'feature1',
      value: '100% Recycled Material',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'light-duty-info',
      key: 'feature2',
      value: '4 Ways Entry',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'light-duty-info',
      key: 'feature3',
      value: 'Anti Slip',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'light-duty-info',
      key: 'feature4',
      value: 'SPM 15 Certified',
      sortOrder: 4,
    },
    {
      page: 'plastic-pallets',
      section: 'light-duty-info',
      key: 'feature5',
      value: 'No Nails, No Product Damage',
      sortOrder: 5,
    },
    {
      page: 'plastic-pallets',
      section: 'light-duty-info',
      key: 'feature6',
      value: 'Racking System N/A',
      sortOrder: 6,
    },

    // Rental Hero Section
    {
      page: 'plastic-pallets',
      section: 'rental-hero',
      key: 'title',
      value: 'Rental',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'rental-hero',
      key: 'highlight',
      value: 'Pallets',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'rental-hero',
      key: 'description',
      value: 'PAFT offers a unique, innovative approach to product storage via our flexible rental service tailored to meet the specific needs of each client, allowing you to convert pallet costs from CAPEX to OPEX. Our rental options include misuse and abuse protection and can be arranged for both short and long-term periods, providing a cost-effective solution without the need for capital investment.',
      sortOrder: 3,
    },

    // CTA Section
    {
      page: 'plastic-pallets',
      section: 'cta',
      key: 'title',
      value: 'Need',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'cta',
      key: 'highlight',
      value: 'Custom Solutions?',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'cta',
      key: 'description',
      value: 'We can manufacture pallets according to your specific requirements',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'cta',
      key: 'button1-text',
      value: 'Request a Quote →',
      sortOrder: 4,
    },
    {
      page: 'plastic-pallets',
      section: 'cta',
      key: 'button2-text',
      value: 'Contact Our Team',
      sortOrder: 5,
    },

    // Product Specifications Labels (for ProductCard component)
    {
      page: 'plastic-pallets',
      section: 'product-specs',
      key: 'dimensions-label',
      value: 'Dimensions',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'product-specs',
      key: 'design-label',
      value: 'Design',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'product-specs',
      key: 'weight-label',
      value: 'Weight',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'product-specs',
      key: 'static-load-label',
      value: 'Static Load',
      sortOrder: 4,
    },
    {
      page: 'plastic-pallets',
      section: 'product-specs',
      key: 'dynamic-load-label',
      value: 'Dynamic Load',
      sortOrder: 5,
    },
    {
      page: 'plastic-pallets',
      section: 'product-specs',
      key: 'rack-load-label',
      value: 'Rack Load',
      sortOrder: 6,
    },
    {
      page: 'plastic-pallets',
      section: 'product-specs',
      key: 'expected-life-label',
      value: 'Expected Life',
      sortOrder: 7,
    },

    // M1 Heavy Duty Product Specifications
    {
      page: 'plastic-pallets',
      section: 'product-m1',
      key: 'product-m1-product-name',
      value: 'M1 Heavy Duty Pallet',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m1',
      key: 'product-m1-dimensions',
      value: '1000 × 1200 × 150 mm',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m1',
      key: 'product-m1-design',
      value: '3 SKID',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m1',
      key: 'product-m1-static-load',
      value: 'Up to 10.0 Tons',
      sortOrder: 4,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m1',
      key: 'product-m1-dynamic-load',
      value: 'Up to 4.0 Tons',
      sortOrder: 5,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m1',
      key: 'product-m1-rack-load',
      value: 'Up to 1.75 Tons',
      sortOrder: 6,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m1',
      key: 'product-m1-expected-life',
      value: 'Up to 10 Years',
      sortOrder: 7,
    },

    // M2 Heavy Duty Product Specifications
    {
      page: 'plastic-pallets',
      section: 'product-m2',
      key: 'product-m2-product-name',
      value: 'M2 Heavy Duty Pallet',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m2',
      key: 'product-m2-dimensions',
      value: '1100 × 1300 × 150 mm',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m2',
      key: 'product-m2-design',
      value: '3 SKID',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m2',
      key: 'product-m2-static-load',
      value: 'Up to 8.0 Tons',
      sortOrder: 4,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m2',
      key: 'product-m2-dynamic-load',
      value: 'Up to 3.0 Tons',
      sortOrder: 5,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m2',
      key: 'product-m2-rack-load',
      value: 'Up to 2 Tons',
      sortOrder: 6,
    },
    {
      page: 'plastic-pallets',
      section: 'product-m2',
      key: 'product-m2-expected-life',
      value: 'Up to 10 Years',
      sortOrder: 7,
    },

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

    // Double Deck Light Product Specifications
    {
      page: 'plastic-pallets',
      section: 'product-double-deck',
      key: 'product-double-deck-product-name',
      value: 'Double Deck Light Pallet',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'product-double-deck',
      key: 'product-double-deck-dimensions',
      value: '1000 × 1200 × 130 mm',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'product-double-deck',
      key: 'product-double-deck-design',
      value: 'Double Deck',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'product-double-deck',
      key: 'product-double-deck-weight',
      value: '7.2 kg',
      sortOrder: 4,
    },
    {
      page: 'plastic-pallets',
      section: 'product-double-deck',
      key: 'product-double-deck-static-load',
      value: '1 Ton',
      sortOrder: 5,
    },
    {
      page: 'plastic-pallets',
      section: 'product-double-deck',
      key: 'product-double-deck-dynamic-load',
      value: '1 Ton',
      sortOrder: 6,
    },
    {
      page: 'plastic-pallets',
      section: 'product-double-deck',
      key: 'product-double-deck-rack-load',
      value: 'Non-Rackable',
      sortOrder: 7,
    },
    {
      page: 'plastic-pallets',
      section: 'product-double-deck',
      key: 'product-double-deck-expected-life',
      value: 'Export Grade',
      sortOrder: 8,
    },

    // 9 Leg Light Product Specifications
    {
      page: 'plastic-pallets',
      section: 'product-9-leg',
      key: 'product-9-leg-product-name',
      value: '9 Leg Light Pallet',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'product-9-leg',
      key: 'product-9-leg-dimensions',
      value: '1000 × 1200 × 140 mm',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'product-9-leg',
      key: 'product-9-leg-design',
      value: '9-Leg',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'product-9-leg',
      key: 'product-9-leg-weight',
      value: '5.5 kg',
      sortOrder: 4,
    },
    {
      page: 'plastic-pallets',
      section: 'product-9-leg',
      key: 'product-9-leg-static-load',
      value: '0.75 Ton',
      sortOrder: 5,
    },
    {
      page: 'plastic-pallets',
      section: 'product-9-leg',
      key: 'product-9-leg-dynamic-load',
      value: '0.75 Ton',
      sortOrder: 6,
    },
    {
      page: 'plastic-pallets',
      section: 'product-9-leg',
      key: 'product-9-leg-rack-load',
      value: 'Non-Rackable',
      sortOrder: 7,
    },
    {
      page: 'plastic-pallets',
      section: 'product-9-leg',
      key: 'product-9-leg-expected-life',
      value: 'Export Grade',
      sortOrder: 8,
    },

    // Rental Product Specifications
    {
      page: 'plastic-pallets',
      section: 'product-rental',
      key: 'product-rental-product-name',
      value: 'Rental Pallet',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'product-rental',
      key: 'product-rental-dimensions',
      value: '1000 × 1200 × 150 mm',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'product-rental',
      key: 'product-rental-design',
      value: 'Heavy Duty',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'product-rental',
      key: 'product-rental-static-load',
      value: 'Up to 10.0 Tons',
      sortOrder: 4,
    },
    {
      page: 'plastic-pallets',
      section: 'product-rental',
      key: 'product-rental-dynamic-load',
      value: 'Up to 4.0 Tons',
      sortOrder: 5,
    },
    {
      page: 'plastic-pallets',
      section: 'product-rental',
      key: 'product-rental-rack-load',
      value: 'Up to 2.0 Tons',
      sortOrder: 6,
    },
    {
      page: 'plastic-pallets',
      section: 'product-rental',
      key: 'product-rental-expected-life',
      value: '10+ Years',
      sortOrder: 7,
    },
  ];

  await contentRepository.save(plasticPalletsContent);
  console.log('Plastic Pallets content seeded successfully!');
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
      await seedPlasticPalletsContent(dataSource);
      await dataSource.destroy();
    } catch (error) {
      console.error('Error seeding plastic-pallets content:', error);
      process.exit(1);
    }
  });
}