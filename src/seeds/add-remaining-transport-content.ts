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

const remainingContent = [
  // Product 4: RPC 6430
  { page: 'transport-logistics', section: 'product-4', key: 'title', value: 'RPC 6430', sortOrder: 31 },
  { page: 'transport-logistics', section: 'product-4', key: 'subtitle', value: '600×400×300mm', sortOrder: 32 },
  { page: 'transport-logistics', section: 'product-4', key: 'image', value: 'https://paft.eg/wp-content/uploads/2026/02/image-removebg-preview-1.png', sortOrder: 33 },
  { page: 'transport-logistics', section: 'product-4', key: 'spec-row-1', value: 'External Dimension,600×400×300 mm', sortOrder: 34 },
  { page: 'transport-logistics', section: 'product-4', key: 'spec-row-2', value: 'Internal Dimension,576×376×291 mm', sortOrder: 35 },
  { page: 'transport-logistics', section: 'product-4', key: 'spec-row-3', value: 'Tare Weight,2.8 KG', sortOrder: 36 },
  { page: 'transport-logistics', section: 'product-4', key: 'spec-row-4', value: 'Volume Capacity,61 L', sortOrder: 37 },
  { page: 'transport-logistics', section: 'product-4', key: 'spec-row-5', value: 'Unit Load,30 KG', sortOrder: 38 },
  { page: 'transport-logistics', section: 'product-4', key: 'price-label', value: 'On Call', sortOrder: 39 },

  // Product 5: Large Foldable Crate
  { page: 'transport-logistics', section: 'product-5', key: 'title', value: 'Large Foldable Crate', sortOrder: 40 },
  { page: 'transport-logistics', section: 'product-5', key: 'subtitle', value: '800×600×984mm', sortOrder: 41 },
  { page: 'transport-logistics', section: 'product-5', key: 'image', value: 'https://paft.eg/wp-content/uploads/2026/02/image-removebg-preview.png', sortOrder: 42 },
  { page: 'transport-logistics', section: 'product-5', key: 'spec-row-1', value: 'External Dimension,800×600×984 mm', sortOrder: 43 },
  { page: 'transport-logistics', section: 'product-5', key: 'spec-row-2', value: 'Internal Dimension,760×560×852 mm', sortOrder: 44 },
  { page: 'transport-logistics', section: 'product-5', key: 'spec-row-3', value: 'Folding Height,334 mm', sortOrder: 45 },
  { page: 'transport-logistics', section: 'product-5', key: 'spec-row-4', value: 'Tare Weight,25 KG', sortOrder: 46 },
  { page: 'transport-logistics', section: 'product-5', key: 'spec-row-5', value: 'Volume Capacity,368 L', sortOrder: 47 },
  { page: 'transport-logistics', section: 'product-5', key: 'spec-row-6', value: 'Unit Load,250 KG', sortOrder: 48 },
  { page: 'transport-logistics', section: 'product-5', key: 'price-label', value: 'On Call', sortOrder: 49 },

  // Product 6: RPC 6411
  { page: 'transport-logistics', section: 'product-6', key: 'title', value: 'RPC 6411', sortOrder: 50 },
  { page: 'transport-logistics', section: 'product-6', key: 'subtitle', value: '600×400×115mm', sortOrder: 51 },
  { page: 'transport-logistics', section: 'product-6', key: 'image', value: 'https://paft.eg/wp-content/uploads/2026/02/WhatsApp_Image_2026-02-05_at_4.06.42_PM-removebg-preview-2.png', sortOrder: 52 },
  { page: 'transport-logistics', section: 'product-6', key: 'spec-row-1', value: 'External Dimension,600×400×115 mm', sortOrder: 53 },
  { page: 'transport-logistics', section: 'product-6', key: 'spec-row-2', value: 'Internal Dimension,576×376×105 mm', sortOrder: 54 },
  { page: 'transport-logistics', section: 'product-6', key: 'spec-row-3', value: 'Tare Weight,1.5 KG', sortOrder: 55 },
  { page: 'transport-logistics', section: 'product-6', key: 'spec-row-4', value: 'Volume Capacity,23 L', sortOrder: 56 },
  { page: 'transport-logistics', section: 'product-6', key: 'spec-row-5', value: 'Unit Load,15 KG', sortOrder: 57 },
  { page: 'transport-logistics', section: 'product-6', key: 'price-label', value: 'On Call', sortOrder: 58 },

  // Product 7: Sheet Separators
  { page: 'transport-logistics', section: 'product-7', key: 'title', value: 'Sheet Separators', sortOrder: 59 },
  { page: 'transport-logistics', section: 'product-7', key: 'image', value: 'https://paft.eg/wp-content/uploads/2025/11/WhatsApp_Image_2025-11-25_at_5.14.26_PM-removebg-preview.png', sortOrder: 60 },

  // Product 8: Gallon Racks
  { page: 'transport-logistics', section: 'product-8', key: 'title', value: 'Gallon Racks', sortOrder: 61 },
  { page: 'transport-logistics', section: 'product-8', key: 'image', value: 'https://paft.eg/wp-content/uploads/2025/06/f2883d_1160983ac47f4db8b0586f4a4f0d4a93_mv2-removebg-preview-1.png', sortOrder: 62 },
  { page: 'transport-logistics', section: 'product-8', key: 'features', value: 'The 4 pcs Set,The 8 pcs Set', sortOrder: 63 },

  // CTA Section
  { page: 'transport-logistics', section: 'cta', key: 'title', value: 'Need a Custom Quote?', sortOrder: 64 },
  { page: 'transport-logistics', section: 'cta', key: 'description', value: 'We offer tailored solutions for crates, IBCs, and logistics accessories', sortOrder: 65 },
];

async function addRemainingContent() {
  try {
    console.log('🔌 Connecting to database...');
    await dataSource.initialize();
    console.log('✅ Database connection established');

    const contentRepository = dataSource.getRepository(Content);

    console.log('📦 Adding remaining transport-logistics content...');
    
    for (const contentData of remainingContent) {
      const content = contentRepository.create(contentData);
      await contentRepository.save(content);
      console.log(`✅ Added: ${content.section} - ${content.key}`);
    }

    console.log(`\n🎉 Successfully added ${remainingContent.length} additional content items!`);

  } catch (error) {
    console.error('❌ Error adding content:', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('🔌 Database connection closed');
    }
  }
}

addRemainingContent();