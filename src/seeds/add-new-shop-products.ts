import { DataSource } from 'typeorm';
import { Product } from '../products/entities/product.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'paft_cms',
  entities: [Product],
  synchronize: false,
});

const newProducts = [
  // Standard Plastic Pallets
  {
    name: 'Standard Euro Pallet 1200x800',
    nameAr: 'باليت يورو قياسي 1200x800',
    price: 45.99,
    originalPrice: 55.99,
    rating: 4.8,
    reviewCount: 124,
    category: 'Plastic Pallets',
    categoryAr: 'باليتات بلاستيكية',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop&crop=center',
    badge: 'Best Seller',
    inStock: true,
    stockQuantity: 150,
    description: 'Heavy-duty euro standard plastic pallet, perfect for warehouse and logistics operations.',
    descriptionAr: 'باليت بلاستيكي قياسي يورو عالي التحمل، مثالي لعمليات المستودعات واللوجستيات.',
    fullDescription: 'This euro standard plastic pallet is designed for maximum durability and efficiency. Made from high-quality recycled plastic, it can handle loads up to 1500kg static and 1000kg dynamic. Perfect for automated systems and international shipping.',
    dimensions: '1200x800x150mm',
    design: 'Euro Standard',
    weight: '18kg',
    staticLoad: '1500kg',
    dynamicLoad: '1000kg',
    rackLoad: '800kg',
    expectedLife: '10+ years',
    isActive: true,
    sortOrder: 1,
  },
  {
    name: 'Heavy Duty Industrial Pallet 1200x1000',
    nameAr: 'باليت صناعي عالي التحمل 1200x1000',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.9,
    reviewCount: 89,
    category: 'Plastic Pallets',
    categoryAr: 'باليتات بلاستيكية',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop&crop=center',
    badge: 'Heavy Duty',
    inStock: true,
    stockQuantity: 75,
    description: 'Extra heavy-duty plastic pallet for industrial applications with superior load capacity.',
    descriptionAr: 'باليت بلاستيكي فائق التحمل للتطبيقات الصناعية مع قدرة تحميل فائقة.',
    fullDescription: 'Built for the toughest industrial environments, this heavy-duty pallet can handle extreme loads and harsh conditions. Features reinforced structure and anti-slip surface.',
    dimensions: '1200x1000x160mm',
    design: 'Industrial Grade',
    weight: '25kg',
    staticLoad: '3000kg',
    dynamicLoad: '1500kg',
    rackLoad: '1200kg',
    expectedLife: '15+ years',
    isActive: true,
    sortOrder: 2,
  },
  {
    name: 'Lightweight Export Pallet 1200x800',
    nameAr: 'باليت تصدير خفيف الوزن 1200x800',
    price: 32.99,
    rating: 4.6,
    reviewCount: 156,
    category: 'Plastic Pallets',
    categoryAr: 'باليتات بلاستيكية',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
    badge: 'Export Ready',
    inStock: true,
    stockQuantity: 200,
    description: 'Lightweight plastic pallet designed for export and one-way shipping applications.',
    descriptionAr: 'باليت بلاستيكي خفيف الوزن مصمم للتصدير وتطبيقات الشحن أحادية الاتجاه.',
    fullDescription: 'Optimized for export markets, this lightweight pallet reduces shipping costs while maintaining structural integrity. ISPM-15 exempt and fully recyclable.',
    dimensions: '1200x800x125mm',
    design: 'Export Optimized',
    weight: '12kg',
    staticLoad: '1000kg',
    dynamicLoad: '600kg',
    rackLoad: '400kg',
    expectedLife: '5+ years',
    isActive: true,
    sortOrder: 3,
  },
  // IBC Containers
  {
    name: '1000L IBC Container with Steel Cage',
    nameAr: 'حاوية IBC 1000 لتر مع قفص فولاذي',
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.7,
    reviewCount: 67,
    category: 'IBC Containers',
    categoryAr: 'حاويات IBC',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=600&fit=crop&crop=center',
    badge: 'Industrial',
    inStock: true,
    stockQuantity: 45,
    description: 'High-capacity IBC container with protective steel cage for liquid storage and transport.',
    descriptionAr: 'حاوية IBC عالية السعة مع قفص فولاذي واقي لتخزين ونقل السوائل.',
    fullDescription: 'Professional-grade IBC container featuring a robust steel cage and high-density polyethylene inner container. Perfect for chemicals, food-grade liquids, and industrial applications.',
    dimensions: '1200x1000x1160mm',
    design: 'Steel Cage Protected',
    weight: '68kg',
    staticLoad: '1000L capacity',
    dynamicLoad: 'UN certified',
    rackLoad: 'Stackable x2',
    expectedLife: '8+ years',
    isActive: true,
    sortOrder: 4,
  },
  // Crates & Bins
  {
    name: 'Stackable Storage Crate 600x400',
    nameAr: 'صندوق تخزين قابل للتكديس 600x400',
    price: 24.99,
    rating: 4.5,
    reviewCount: 203,
    category: 'Crates & Bins',
    categoryAr: 'صناديق وحاويات',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center',
    inStock: true,
    stockQuantity: 300,
    description: 'Versatile stackable crate for storage, transport, and organization applications.',
    descriptionAr: 'صندوق قابل للتكديس متعدد الاستخدامات للتخزين والنقل والتنظيم.',
    fullDescription: 'Durable plastic crate with integrated handles and stackable design. Perfect for retail, agriculture, and industrial storage needs.',
    dimensions: '600x400x300mm',
    design: 'Stackable with handles',
    weight: '2.8kg',
    staticLoad: '50kg',
    dynamicLoad: '35kg',
    rackLoad: '25kg',
    expectedLife: '7+ years',
    isActive: true,
    sortOrder: 5,
  },
  {
    name: 'Ventilated Produce Crate 600x400',
    nameAr: 'صندوق منتجات مهوى 600x400',
    price: 28.99,
    rating: 4.8,
    reviewCount: 145,
    category: 'Crates & Bins',
    categoryAr: 'صناديق وحاويات',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop&crop=center',
    badge: 'Food Safe',
    inStock: true,
    stockQuantity: 180,
    description: 'Food-grade ventilated crate ideal for fresh produce and agricultural products.',
    descriptionAr: 'صندوق مهوى صالح للطعام مثالي للمنتجات الطازجة والمنتجات الزراعية.',
    fullDescription: 'FDA-approved food-grade plastic crate with optimized ventilation for fresh produce. Stackable design with easy-grip handles.',
    dimensions: '600x400x200mm',
    design: 'Ventilated food-grade',
    weight: '2.2kg',
    staticLoad: '40kg',
    dynamicLoad: '30kg',
    rackLoad: '20kg',
    expectedLife: '6+ years',
    isActive: true,
    sortOrder: 6,
  },
  // Pallet Accessories
  {
    name: 'Anti-Slip Pallet Mat Set',
    nameAr: 'مجموعة حصائر باليت مانعة للانزلاق',
    price: 15.99,
    rating: 4.4,
    reviewCount: 89,
    category: 'Pallet Accessories',
    categoryAr: 'إكسسوارات الباليتات',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop&crop=center',
    inStock: true,
    stockQuantity: 250,
    description: 'High-grip anti-slip mats to secure loads on pallets during transport.',
    descriptionAr: 'حصائر مانعة للانزلاق عالية الالتصاق لتأمين الأحمال على الباليتات أثناء النقل.',
    fullDescription: 'Professional anti-slip mats made from recycled rubber. Prevents load shifting and reduces damage during transport.',
    dimensions: '1200x800x5mm',
    design: 'High-grip rubber',
    weight: '3.5kg per set',
    staticLoad: 'Up to 2000kg',
    dynamicLoad: 'Tested for transport',
    rackLoad: 'Universal fit',
    expectedLife: '3+ years',
    isActive: true,
    sortOrder: 7,
  },
  {
    name: 'Pallet Corner Protectors (Set of 4)',
    nameAr: 'واقيات زوايا الباليت (مجموعة من 4)',
    price: 12.99,
    rating: 4.3,
    reviewCount: 76,
    category: 'Pallet Accessories',
    categoryAr: 'إكسسوارات الباليتات',
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=800&h=600&fit=crop&crop=center',
    inStock: true,
    stockQuantity: 400,
    description: 'Protective corner guards to prevent damage during handling and transport.',
    descriptionAr: 'واقيات زوايا واقية لمنع الضرر أثناء المناولة والنقل.',
    fullDescription: 'Durable plastic corner protectors that prevent strap damage and load shifting. Easy to install and reusable.',
    dimensions: '150x150x150mm',
    design: 'Universal corner fit',
    weight: '0.8kg per set',
    staticLoad: 'Reinforcement only',
    dynamicLoad: 'Strap protection',
    rackLoad: 'Edge protection',
    expectedLife: '5+ years',
    isActive: true,
    sortOrder: 8,
  },
];

async function addNewShopProducts() {
  try {
    console.log('🔌 Connecting to database...');
    await dataSource.initialize();
    console.log('✅ Database connection established');

    const productRepository = dataSource.getRepository(Product);

    console.log('🧹 Clearing existing products...');
    const existingProducts = await productRepository.find();
    if (existingProducts.length > 0) {
      await productRepository.remove(existingProducts);
      console.log(`✅ Removed ${existingProducts.length} existing products`);
    } else {
      console.log('✅ No existing products to remove');
    }

    console.log('📦 Adding new shop products...');
    
    for (const productData of newProducts) {
      const product = productRepository.create(productData);
      await productRepository.save(product);
      console.log(`✅ Added: ${product.name} - $${product.price}`);
    }

    console.log(`\n🎉 Successfully added ${newProducts.length} new products!`);
    
    // Show summary
    const totalProducts = await productRepository.count();
    console.log(`📊 Total products in database: ${totalProducts}`);

  } catch (error) {
    console.error('❌ Error adding products:', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('🔌 Database connection closed');
    }
  }
}

addNewShopProducts();