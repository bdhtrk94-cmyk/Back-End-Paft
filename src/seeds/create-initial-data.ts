import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as bcrypt from 'bcrypt';

// Load environment variables
config();

async function createInitialData() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'paft_cms',
  });

  try {
    await dataSource.initialize();
    console.log('✅ Database connection established\n');

    // Create admin user
    console.log('👤 Creating Admin User...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await dataSource.query(`
      INSERT INTO users (name, email, password, role, created_at, updated_at) 
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `, ['Admin User', 'admin@paft.com', hashedPassword, 'super_admin']);
    
    console.log('✅ Admin user created: admin@paft.com / admin123');

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10);
    await dataSource.query(`
      INSERT INTO users (name, email, password, role, created_at, updated_at) 
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `, ['Mohamed Ahmed', 'mohamed@example.com', userPassword, 'user']);
    
    console.log('✅ Regular user created: mohamed@example.com / user123');

    // Create sample products
    console.log('\n📦 Creating Sample Products...');
    
    const products = [
      {
        name: 'Standard Plastic Pallet 1200x1000',
        description: 'Heavy-duty plastic pallet suitable for warehouse storage and transportation',
        category: 'standard',
        price: 150.00,
        image: '/images/pallet-standard.jpg'
      },
      {
        name: 'Euro Plastic Pallet 1200x800',
        description: 'European standard plastic pallet for international shipping',
        category: 'euro',
        price: 135.00,
        image: '/images/pallet-euro.jpg'
      },
      {
        name: 'Heavy Duty Pallet 1200x1200',
        description: 'Extra strong plastic pallet for heavy industrial applications',
        category: 'heavy-duty',
        price: 220.00,
        image: '/images/pallet-heavy.jpg'
      },
      {
        name: 'Lightweight Pallet 1000x800',
        description: 'Lightweight plastic pallet for light cargo and storage',
        category: 'lightweight',
        price: 95.00,
        image: '/images/pallet-light.jpg'
      },
      {
        name: 'Export Pallet 1100x1100',
        description: 'ISPM-15 compliant plastic pallet for international export',
        category: 'export',
        price: 180.00,
        image: '/images/pallet-export.jpg'
      },
      {
        name: 'Specialized Pharmaceutical Pallet',
        description: 'FDA approved plastic pallet for pharmaceutical industry',
        category: 'specialized',
        price: 280.00,
        image: '/images/pallet-pharma.jpg'
      }
    ];

    for (const product of products) {
      await dataSource.query(`
        INSERT INTO products (
          name, description, category, price, image, 
          in_stock, stock_quantity, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `, [
        product.name, product.description, product.category, product.price,
        product.image, 1, 100
      ]);
      
      console.log(`✅ Created product: ${product.name}`);
    }

    // Create sample pages
    console.log('\n📄 Creating Sample Pages...');
    
    const pages = [
      {
        title: 'About PAFT',
        slug: 'about',
        content: 'PAFT is a leading manufacturer of premium plastic pallets in Egypt, founded in 2010...',
        isPublished: true
      },
      {
        title: 'Our Services',
        slug: 'services',
        content: 'We provide comprehensive plastic pallet solutions for various industries...',
        isPublished: true
      },
      {
        title: 'Quality Standards',
        slug: 'quality',
        content: 'Our products meet international quality standards including ISO 9001, ISO 14001, and HACCP...',
        isPublished: true
      }
    ];

    for (const page of pages) {
      await dataSource.query(`
        INSERT INTO pages (title, slug, content, is_published, created_at, updated_at)
        VALUES (?, ?, ?, ?, NOW(), NOW())
      `, [page.title, page.slug, page.content, page.isPublished]);
      
      console.log(`✅ Created page: ${page.title}`);
    }

    // Create sample site content
    console.log('\n🎨 Creating Site Content...');
    
    const siteContent = [
      {
        section_key: 'hero_title',
        title_en: 'Premium Plastic Pallets for Industrial Excellence',
        content_en: 'Durable, eco-friendly, and cost-effective logistics solutions since 2010'
      },
      {
        section_key: 'company_phone',
        title_en: '+20 123 456 7890',
        content_en: 'Main company phone number'
      },
      {
        section_key: 'company_email',
        title_en: 'info@paft.com',
        content_en: 'Main company email address'
      }
    ];

    for (const content of siteContent) {
      await dataSource.query(`
        INSERT INTO site_content (section_key, title_en, content_en, is_draft, created_at, updated_at)
        VALUES (?, ?, ?, ?, NOW(), NOW())
      `, [content.section_key, content.title_en, content.content_en, 0]);
      
      console.log(`✅ Created site content: ${content.section_key}`);
    }

    console.log('\n🎉 Initial data created successfully!');
    console.log('\n📊 Summary:');
    console.log('- 2 Users (1 admin, 1 regular user)');
    console.log('- 6 Products (covering all categories)');
    console.log('- 3 Pages');
    console.log('- 3 Site content items');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await dataSource.destroy();
    console.log('\n🔌 Database connection closed');
  }
}

createInitialData();