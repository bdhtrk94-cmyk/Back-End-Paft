import { DataSource } from 'typeorm';

export async function forceFixRoles() {
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

    // Force update Mohamed's role specifically
    const updateMohamed = await dataSource.query(
      "UPDATE users SET role = 'user' WHERE email = 'Mohamed@gmail.com'"
    );
    console.log(`Updated Mohamed's role: ${updateMohamed.affectedRows} rows affected`);

    // Force update all users to have proper roles
    const updateAll = await dataSource.query(`
      UPDATE users 
      SET role = CASE 
        WHEN email = 'Abdelrahman@gmail.com' THEN 'admin'
        ELSE 'user'
      END
    `);
    console.log(`Updated all users: ${updateAll.affectedRows} rows affected`);

    // Verify the changes
    const verifyUsers = await dataSource.query('SELECT id, name, email, role FROM users');
    console.log('\nVerified users:');
    verifyUsers.forEach((user: any) => {
      console.log(`- ${user.name} (${user.email}): "${user.role}"`);
    });

    // Double check with a different query
    console.log('\nDouble check with different query:');
    const doubleCheck = await dataSource.query('SELECT * FROM users');
    doubleCheck.forEach((user: any) => {
      console.log(`- ID: ${user.id}, Name: ${user.name}, Role: "${user.role}" (length: ${user.role?.length || 0})`);
    });

  } catch (error) {
    console.error('Error forcing role fix:', error);
  } finally {
    await dataSource.destroy();
    console.log('\nDatabase connection closed');
  }
}

// Run the fix if this file is executed directly
if (require.main === module) {
  require('dotenv').config();
  forceFixRoles();
}