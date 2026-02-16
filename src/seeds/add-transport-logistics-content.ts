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

const transportLogisticsContent = [
  // Hero Section
  { page: 'transport-logistics', section: 'hero', key: 'badge-text', value: 'PAFT Product Range', sortOrder: 1 },
  { page: 'transport-logistics', section: 'hero', key: 'title', value: 'Transport & Logistics Items', sortOrder: 2 },
  { page: 'transport-logistics', section: 'hero', key: 'description', value: 'Innovative foldable IBCs, reusable plastic crates, sheet separators, and gallon racks — engineered for modern supply chains with maximum efficiency and sustainability.', sortOrder: 3 },

  // Section Header
  { page: 'transport-logistics', section: 'products', key: 'section-title', value: 'Our Catalogue', sortOrder: 4 },
  { page: 'transport-logistics', section: 'products', key: 'section-subtitle', value: 'Foldable IBCs · RPC Crates · Accessories', sortOrder: 5 },

  // Product 1: Foldable IBC
  { page: 'transport-logistics', section: 'product-1', key: 'title', value: 'Foldable IBC - 1000 Lit', sortOrder: 10 },
  { page: 'transport-logistics', section: 'product-1', key: 'subtitle', value: '', sortOrder: 11 }, // Added empty subtitle
  { page: 'transport-logistics', section: 'product-1', key: 'image', value: 'https://paft.eg/wp-content/uploads/2025/11/WhatsApp_Image_2025-11-25_at_5.14.27_PM-removebg-preview.png', sortOrder: 12 },
  { page: 'transport-logistics', section: 'product-1', key: 'spec-headers', value: 'Types of Truck,2.6m Standard Trailer,3m Mega road train', sortOrder: 13 },
  { page: 'transport-logistics', section: 'product-1', key: 'spec-row-1', value: 'IC 1040,208,270', sortOrder: 14 },
  { page: 'transport-logistics', section: 'product-1', key: 'spec-row-2', value: 'Industry standard IBC,130,180', sortOrder: 15 },
  { page: 'transport-logistics', section: 'product-1', key: 'spec-row-3', value: 'Improvement rate,60% More,50% More', sortOrder: 16 },
  { page: 'transport-logistics', section: 'product-1', key: 'price-label', value: 'On Call', sortOrder: 17 },

  // Product 2: RPC 6419
  { page: 'transport-logistics', section: 'product-2', key: 'title', value: 'RPC 6419', sortOrder: 20 },
  { page: 'transport-logistics', section: 'product-2', key: 'subtitle', value: '600×400×195mm', sortOrder: 21 },
  { page: 'transport-logistics', section: 'product-2', key: 'image', value: 'https://paft.eg/wp-content/uploads/2026/02/WhatsApp_Image_2026-02-05_at_4.37.38_PM-removebg-preview.png', sortOrder: 22 },
  { page: 'transport-logistics', section: 'product-2', key: 'spec-row-1', value: 'External Dimension,600×400×195 mm', sortOrder: 23 },
  { page: 'transport-logistics', section: 'product-2', key: 'spec-row-2', value: 'Internal Dimension,576×376×180 mm', sortOrder: 24 },
  { page: 'transport-logistics', section: 'product-2', key: 'spec-row-3', value: 'Tare Weight,1.8 KG', sortOrder: 25 },
  { page: 'transport-logistics', section: 'product-2', key: 'spec-row-4', value: 'Volume Capacity,39 L', sortOrder: 26 },
  { page: 'transport-logistics', section: 'product-2', key: 'spec-row-5', value: 'Unit Load,20 KG', sortOrder: 27 },
  { page: 'transport-logistics', section: 'product-2', key: 'price-label', value: 'On Call', sortOrder: 28 },

  // Product 3: RPC 6422
  { page: 'transport-logistics', section: 'product-3', key: 'title', value: 'RPC 6422', sortOrder: 30 },
  { page: 'transport-logistics', section: 'product-3', key: 'subtitle', value: '600×400×225mm', sortOrder: 31 },
  { page: 'transport-logistics', section: 'product-3', key: 'image', value: 'https://paft.eg/wp-content/uploads/2026/02/WhatsApp_Image_2026-02-05_at_4.40.55_PM-removebg-preview.png', sortOrder: 32 },
  { page: 'transport-logistics', section: 'product-3', key: 'spec-row-1', value: 'External Dimension,600×400×225 mm', sortOrder: 33 },
  { page: 'transport-logistics', section: 'product-3', key: 'spec-row-2', value: 'Internal Dimension,576×376×212 mm', sortOrder: 34 },
  { page: 'transport-logistics', section: 'product-3', key: 'spec-row-3', value: 'Tare Weight,2.0 KG', sortOrder: 35 },
  { page: 'transport-logistics', section: 'product-3', key: 'spec-row-4', value: 'Volume Capacity,47 L', sortOrder: 36 },
  { page: 'transport-logistics', section: 'product-3', key: 'spec-row-5', value: 'Unit Load,22 KG', sortOrder: 37 },
  { page: 'transport-logistics', section: 'product-3', key: 'price-label', value: 'On Call', sortOrder: 38 },

  // Product 4: RPC 6430
  { page: 'transport-logistics', section: 'product-4', key: 'title', value: 'RPC 6430', sortOrder: 40 },
  { page: 'transport-logistics', section: 'product-4', key: 'subtitle', value: '600×400×300mm', sortOrder: 41 },
  { page: 'transport-logistics', section: 'product-4', key: 'image', value: 'https://paft.eg/wp-content/uploads/2026/02/image-removebg-preview-1.png', sortOrder: 42 },
  { page: 'transport-logistics', section: 'product-4', key: 'spec-row-1', value: 'External Dimension,600×400×300 mm', sortOrder: 43 },
  { page: 'transport-logistics', section: 'product-4', key: 'spec-row-2', value: 'Internal Dimension,576×376×291 mm', sortOrder: 44 },
  { page: 'transport-logistics', section: 'product-4', key: 'spec-row-3', value: 'Tare Weight,2.8 KG', sortOrder: 45 },
  { page: 'transport-logistics', section: 'product-4', key: 'spec-row-4', value: 'Volume Capacity,61 L', sortOrder: 46 },
  { page: 'transport-logistics', section: 'product-4', key: 'spec-row-5', value: 'Unit Load,30 KG', sortOrder: 47 },
  { page: 'transport-logistics', section: 'product-4', key: 'price-label', value: 'On Call', sortOrder: 48 },

  // Product 5: Large Foldable Crate
  { page: 'transport-logistics', section: 'product-5', key: 'title', value: 'Large Foldable Crate', sortOrder: 50 },
  { page: 'transport-logistics', section: 'product-5', key: 'subtitle', value: '800×600×984mm', sortOrder: 51 },
  { page: 'transport-logistics', section: 'product-5', key: 'image', value: 'https://paft.eg/wp-content/uploads/2026/02/image-removebg-preview.png', sortOrder: 52 },
  { page: 'transport-logistics', section: 'product-5', key: 'spec-row-1', value: 'External Dimension,800×600×984 mm', sortOrder: 53 },
  { page: 'transport-logistics', section: 'product-5', key: 'spec-row-2', value: 'Internal Dimension,760×560×852 mm', sortOrder: 54 },
  { page: 'transport-logistics', section: 'product-5', key: 'spec-row-3', value: 'Folding Height,334 mm', sortOrder: 55 },
  { page: 'transport-logistics', section: 'product-5', key: 'spec-row-4', value: 'Tare Weight,25 KG', sortOrder: 56 },
  { page: 'transport-logistics', section: 'product-5', key: 'spec-row-5', value: 'Volume Capacity,368 L', sortOrder: 57 },
  { page: 'transport-logistics', section: 'product-5', key: 'spec-row-6', value: 'Unit Load,250 KG', sortOrder: 58 },
  { page: 'transport-logistics', section: 'product-5', key: 'price-label', value: 'On Call', sortOrder: 59 },

  // Product 6: RPC 6411
  { page: 'transport-logistics', section: 'product-6', key: 'title', value: 'RPC 6411', sortOrder: 60 },
  { page: 'transport-logistics', section: 'product-6', key: 'subtitle', value: '600×400×115mm', sortOrder: 61 },
  { page: 'transport-logistics', section: 'product-6', key: 'image', value: 'https://paft.eg/wp-content/uploads/2026/02/WhatsApp_Image_2026-02-05_at_4.06.42_PM-removebg-preview-2.png', sortOrder: 62 },
  { page: 'transport-logistics', section: 'product-6', key: 'spec-row-1', value: 'External Dimension,600×400×115 mm', sortOrder: 63 },
  { page: 'transport-logistics', section: 'product-6', key: 'spec-row-2', value: 'Internal Dimension,576×376×105 mm', sortOrder: 64 },
  { page: 'transport-logistics', section: 'product-6', key: 'spec-row-3', value: 'Tare Weight,1.5 KG', sortOrder: 65 },
  { page: 'transport-logistics', section: 'product-6', key: 'spec-row-4', value: 'Volume Capacity,23 L', sortOrder: 66 },
  { page: 'transport-logistics', section: 'product-6', key: 'spec-row-5', value: 'Unit Load,15 KG', sortOrder: 67 },
  { page: 'transport-logistics', section: 'product-6', key: 'price-label', value: 'On Call', sortOrder: 68 },

  // Product 7: Sheet Separators
  { page: 'transport-logistics', section: 'product-7', key: 'title', value: 'Sheet Separators', sortOrder: 70 },
  { page: 'transport-logistics', section: 'product-7', key: 'image', value: 'https://paft.eg/wp-content/uploads/2025/11/WhatsApp_Image_2025-11-25_at_5.14.26_PM-removebg-preview.png', sortOrder: 71 },

  // Product 8: Gallon Racks
  { page: 'transport-logistics', section: 'product-8', key: 'title', value: 'Gallon Racks', sortOrder: 80 },
  { page: 'transport-logistics', section: 'product-8', key: 'image', value: 'https://paft.eg/wp-content/uploads/2025/06/f2883d_1160983ac47f4db8b0586f4a4f0d4a93_mv2-removebg-preview-1.png', sortOrder: 81 },
  { page: 'transport-logistics', section: 'product-8', key: 'features', value: 'The 4 pc\'s Set,The 8 pc\'s Set', sortOrder: 82 },

  // CTA Section
  { page: 'transport-logistics', section: 'cta', key: 'cta-title', value: 'Need a Custom Quote?', sortOrder: 90 },
  { page: 'transport-logistics', section: 'cta', key: 'cta-description', value: 'We offer tailored solutions for crates, IBCs, and logistics accessories', sortOrder: 91 },
];

async function addTransportLogisticsContent() {
  try {
    console.log('🔌 Connecting to database...');
    await dataSource.initialize();
    console.log('✅ Database connection established');

    const contentRepository = dataSource.getRepository(Content);

    console.log('🧹 Clearing existing transport-logistics content...');
    await contentRepository.delete({ page: 'transport-logistics' });
    console.log('✅ Existing content cleared');

    console.log('📦 Adding transport-logistics content...');

    for (const contentData of transportLogisticsContent) {
      const content = contentRepository.create(contentData);
      await contentRepository.save(content);
      console.log(`✅ Added: ${content.section} - ${content.key}`);
    }

    console.log(`\n🎉 Successfully added ${transportLogisticsContent.length} content items!`);

  } catch (error) {
    console.error('❌ Error adding content:', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('🔌 Database connection closed');
    }
  }
}

addTransportLogisticsContent();