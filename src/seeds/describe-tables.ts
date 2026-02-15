import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// Load environment variables
config();

async function describeTables() {
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

    const tables = ['users', 'products', 'orders', 'pages', 'site_content'];

    for (const tableName of tables) {
      console.log(`📋 ${tableName.toUpperCase()} TABLE STRUCTURE:`);
      console.log('='.repeat(tableName.length + 20));
      
      const columns = await dataSource.query(`DESCRIBE ${tableName}`);
      columns.forEach((col: any) => {
        console.log(`${col.Field.padEnd(20)} | ${col.Type.padEnd(20)} | ${col.Null} | ${col.Key} | ${col.Default}`);
      });
      console.log('');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await dataSource.destroy();
    console.log('🔌 Database connection closed');
  }
}

describeTables();