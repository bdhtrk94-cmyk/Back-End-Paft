import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// Load environment variables
config();

async function showAllData() {
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

    // Show all users
    console.log('👥 USERS:');
    console.log('=========');
    const users = await dataSource.query('SELECT * FROM users');
    if (users.length > 0) {
      users.forEach((user: any, index: number) => {
        console.log(`${index + 1}. ID: ${user.id}`);
        console.log(`   Name: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Created: ${user.created_at}`);
        console.log('   ---');
      });
    } else {
      console.log('   No users found');
    }

    // Show all products
    console.log('\n📦 PRODUCTS:');
    console.log('============');
    const products = await dataSource.query('SELECT * FROM products');
    if (products.length > 0) {
      products.forEach((product: any, index: number) => {
        console.log(`${index + 1}. ID: ${product.id}`);
        console.log(`   Name: ${product.name}`);
        console.log(`   Category: ${product.category}`);
        console.log(`   Price: $${product.price}`);
        console.log(`   Stock: ${product.stock_quantity}`);
        console.log(`   Created: ${product.created_at}`);
        console.log('   ---');
      });
    } else {
      console.log('   No products found');
    }

    // Show all orders
    console.log('\n🛒 ORDERS:');
    console.log('==========');
    const orders = await dataSource.query('SELECT * FROM orders');
    if (orders.length > 0) {
      orders.forEach((order: any, index: number) => {
        console.log(`${index + 1}. ID: ${order.id}`);
        console.log(`   User ID: ${order.user_id}`);
        console.log(`   Total: $${order.total_amount}`);
        console.log(`   Status: ${order.status}`);
        console.log(`   Created: ${order.created_at}`);
        console.log('   ---');
      });
    } else {
      console.log('   No orders found');
    }

    // Show all pages
    console.log('\n📄 PAGES:');
    console.log('==========');
    const pages = await dataSource.query('SELECT * FROM pages');
    if (pages.length > 0) {
      pages.forEach((page: any, index: number) => {
        console.log(`${index + 1}. ID: ${page.id}`);
        console.log(`   Title: ${page.title}`);
        console.log(`   Slug: ${page.slug}`);
        console.log(`   Published: ${page.is_published ? 'Yes' : 'No'}`);
        console.log(`   Created: ${page.created_at}`);
        console.log('   ---');
      });
    } else {
      console.log('   No pages found');
    }

    // Show all site content
    console.log('\n🎨 SITE CONTENT:');
    console.log('================');
    const siteContent = await dataSource.query('SELECT * FROM site_content');
    if (siteContent.length > 0) {
      siteContent.forEach((content: any, index: number) => {
        console.log(`${index + 1}. ID: ${content.id}`);
        console.log(`   Key: ${content.section_key}`);
        console.log(`   Title: ${content.title_en}`);
        console.log(`   Content: ${content.content_en}`);
        console.log(`   Published: ${content.is_draft ? 'Draft' : 'Published'}`);
        console.log(`   Created: ${content.created_at}`);
        console.log('   ---');
      });
    } else {
      console.log('   No site content found');
    }

    // Show table counts
    console.log('\n📊 TABLE SUMMARY:');
    console.log('=================');
    console.log(`Users: ${users.length}`);
    console.log(`Products: ${products.length}`);
    console.log(`Orders: ${orders.length}`);
    console.log(`Pages: ${pages.length}`);
    console.log(`Site Content: ${siteContent.length}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await dataSource.destroy();
    console.log('\n🔌 Database connection closed');
  }
}

showAllData();