import { DataSource } from 'typeorm';

export async function checkTableStructure() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'paft_cms',
    entities: [],
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    console.log('Database connection established');

    // Check table structure
    const tableStructure = await dataSource.query('DESCRIBE users');
    console.log('\nUsers table structure:');
    tableStructure.forEach((column: any) => {
      console.log(`- ${column.Field}: ${column.Type} (Default: ${column.Default}, Null: ${column.Null})`);
    });

    // Check if there are any constraints on the role column
    const constraints = await dataSource.query(`
      SELECT COLUMN_NAME, COLUMN_TYPE, COLUMN_DEFAULT, IS_NULLABLE, COLUMN_COMMENT
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'paft_cms' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role'
    `);
    console.log('\nRole column details:');
    console.log(constraints);

    // Try to manually set the role using different approaches
    console.log('\nTrying different update approaches...');
    
    // Approach 1: Direct string update
    try {
      await dataSource.query("UPDATE users SET role = 'user' WHERE id = 2");
      console.log('✓ Direct string update succeeded');
    } catch (error) {
      console.log('✗ Direct string update failed:', error.message);
    }

    // Check current state
    const currentState = await dataSource.query('SELECT id, name, email, role FROM users WHERE id = 2');
    console.log('\nCurrent state of Mohamed:');
    console.log(currentState);

    // Try to drop and recreate the role column without enum constraint
    try {
      await dataSource.query('ALTER TABLE users MODIFY COLUMN role VARCHAR(50) DEFAULT "user"');
      console.log('✓ Modified role column to VARCHAR');
      
      await dataSource.query("UPDATE users SET role = 'user' WHERE id = 2");
      console.log('✓ Updated Mohamed to user role');
      
      const finalCheck = await dataSource.query('SELECT id, name, email, role FROM users');
      console.log('\nFinal check:');
      finalCheck.forEach((user: any) => {
        console.log(`- ${user.name}: ${user.role}`);
      });
      
    } catch (error) {
      console.log('✗ Column modification failed:', error.message);
    }

  } catch (error) {
    console.error('Error checking table structure:', error);
  } finally {
    await dataSource.destroy();
    console.log('\nDatabase connection closed');
  }
}

// Run the check if this file is executed directly
if (require.main === module) {
  require('dotenv').config();
  checkTableStructure();
}