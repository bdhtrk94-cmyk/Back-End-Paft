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
  { page: 'transport-logistics', section: 'product-1', key: 'title', value: 'Foldable IBC - 1000 Lit', sortOrder: 6 },
  { page: 'transport-logistics', section: 'product-1', key: 'image', value: 'https://paft.eg/wp-content/uploads/2025/11/WhatsApp_Image_2025-11-25_at_5.14.27_PM-removebg-preview.png', sortOrder: 7 },
  { page: 'transport-logistics', section: 'product-1', key: 'spec-headers', value: 'Types of Truck,2.6m Standard Trailer,3m Mega road train', sortOrder: 8 },
  { page: 'transport-logistics', section: 'product-1', key: 'spec-row-1', value: 'IC 1040,208,270', sortOrder: 9 },
  { page: 'transport-logistics', section: 'product-1', key: 'spec-row-2', value: 'Industry standard IBC,130,180', sortOrder: 10 },
  { page: 'transport-logistics', section: 'product-1', key: 'spec-row-3', value: 'Improvement rate,60% More,50% More', sortOrder: 11 },
  { page: 'transport-logistics', section: 'product-1', key: 'price-label', value: 'On Call', sortOrder: 12 },
  
  // Product 2: RPC 6419
  { page: 'transport-logistics', section: 'product-2', key: 'title', value: 'RPC 6419', sortOrder: 13 },
  { page: 'transport-logistics', section: 'product-2', key: 'subtitle', value: '600×400×195mm', sortOrder: 14 },
  { page: 'transport-logistics', section: 'product-2', key: 'image', value: 'https://paft.eg/wp-content/uploads/2026/02/WhatsApp_Image_2026-02-05_at_4.37.38_PM-removebg-preview.png', sortOrder: 15 },
  { page: 'transport-logistics', section: 'product-2', key: 'spec-row-1', value: 'External Dimension,600×400×195 mm', sortOrder: 16 },
  { page: 'transport-logistics', section: 'product-2', key: 'spec-row-2', value: 'Internal Dimension,576×376×180 mm', sortOrder: 17 },
  { page: 'transport-logistics', section: 'product-2', key: 'spec-row-3', value: 'Tare Weight,1.8 KG', sortOrder: 18 },
  { page: 'transport-logistics', section: 'product-2', key: 'spec-row-4', value: 'Volume Capacity,39 L', sortOrder: 19 },
  { page: 'transport-logistics', section: 'product-2', key: 'spec-row-5', value: 'Unit Load,20 KG', sortOrder: 20 },
  { page: 'transport-logistics', section: 'product-2', key: 'price-label', value: 'On Call', sortOrder: 21 },
  
  // Product 3: RPC 6422
  { page: 'transport-logistics', section: 'product-3', key: 'title', value: 'RPC 6422', sortOrder: 22 },
  { page: 'transport-logistics', section: 'product-3', key: 'subtitle', value: '600×400×225mm', sortOrder: 23 },
  { page: 'transport-logistics', section: 'product-3', key: 'image', value: 'https://paft.eg/wp-content/uploads/2026/02/WhatsApp_Image_2026-02-05_at_4.40.55_PM-removebg-preview.png', sortOrder: 24 },
  { page: 'transport-logistics', section: 'product-3', key: 'spec-row-1', value: 'External Dimension,600×400×225 mm', sortOrder: 25 },
  { page: 'transport-logistics', section: 'product-3', key: 'spec-row-2', value: 'Internal Dimension,576×376×212 mm', sortOrder: 26 },
  { page: 'transport-logistics', section: 'product-3', key: 'spec-row-3', value: 'Tare Weight,2.0 KG', sortOrder: 27 },
  { page: 'transport-logistics', section: 'product-3', key: 'spec-row-4', value: 'Volume Capacity,47 L', sortOrder: 28 },
  { page: 'transport-logistics', section: 'product-3', key: 'spec-row-5', value: 'Unit Load,22 KG', sortOrder: 29 },
  { page: 'transport-logistics', section: 'product-3', key: 'price-label', value: 'On Call', sortOrder: 30 },
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