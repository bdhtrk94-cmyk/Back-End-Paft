import { DataSource } from 'typeorm';
import { Content } from '../content/entities/content.entity';

export async function fixPlasticPalletsKeys(dataSource: DataSource) {
  const contentRepository = dataSource.getRepository(Content);

  console.log('Fixing plastic-pallets content keys...');

  // Delete existing plastic-pallets content
  await contentRepository.delete({ page: 'plastic-pallets' });
  console.log('Deleted existing plastic-pallets content');

  // Add new content with correct keys
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
      key: 'video-title',
      value: 'Product',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'video',
      key: 'video-highlight',
      value: 'Testing',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'video',
      key: 'video-description',
      value: 'Watch our rigorous quality testing in action',
      sortOrder: 3,
    },

    // Light Duty Hero Section
    {
      page: 'plastic-pallets',
      section: 'light-duty-hero',
      key: 'light-duty-title',
      value: 'Light Duty',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'light-duty-hero',
      key: 'light-duty-highlight',
      value: 'Pallets',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'light-duty-hero',
      key: 'light-duty-description',
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
      key: 'rental-title',
      value: 'Rental',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'rental-hero',
      key: 'rental-highlight',
      value: 'Pallets',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'rental-hero',
      key: 'rental-description',
      value: 'PAFT offers a unique, innovative approach to product storage via our flexible rental service tailored to meet the specific needs of each client, allowing you to convert pallet costs from CAPEX to OPEX. Our rental options include misuse and abuse protection and can be arranged for both short and long-term periods, providing a cost-effective solution without the need for capital investment.',
      sortOrder: 3,
    },

    // CTA Section
    {
      page: 'plastic-pallets',
      section: 'cta',
      key: 'cta-title',
      value: 'Need',
      sortOrder: 1,
    },
    {
      page: 'plastic-pallets',
      section: 'cta',
      key: 'cta-highlight',
      value: 'Custom Solutions?',
      sortOrder: 2,
    },
    {
      page: 'plastic-pallets',
      section: 'cta',
      key: 'cta-description',
      value: 'We can manufacture pallets according to your specific requirements',
      sortOrder: 3,
    },
    {
      page: 'plastic-pallets',
      section: 'cta',
      key: 'cta-button1-text',
      value: 'Request a Quote →',
      sortOrder: 4,
    },
    {
      page: 'plastic-pallets',
      section: 'cta',
      key: 'cta-button2-text',
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
  ];

  await contentRepository.save(plasticPalletsContent);
  console.log('Added new plastic-pallets content with correct keys!');
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
      await fixPlasticPalletsKeys(dataSource);
      await dataSource.destroy();
    } catch (error) {
      console.error('Error fixing plastic-pallets keys:', error);
      process.exit(1);
    }
  });
}