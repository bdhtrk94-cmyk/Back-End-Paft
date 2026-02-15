import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// Load environment variables
config();

async function showTables() {
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

    // Show all tables
    console.log('📋 EXISTING TABLES:');
    console.log('==================');
    const tables = await dataSource.query('SHOW TABLES');
    
    if (tables.length > 0) {
      tables.forEach((table: any, index: number) => {
        const tableName = Object.values(table)[0];
        console.log(`${index + 1}. ${tableName}`);
      });
    } else {
      console.log('   No tables found in database');
    }

    console.log(`\nTotal tables: ${tables.length}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await dataSource.destroy();
    console.log('\n🔌 Database connection closed');
  }
}

showTables();