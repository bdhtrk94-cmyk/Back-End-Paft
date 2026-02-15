import { DataSource } from 'typeorm';

export async function fixUserRolesDirect() {
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

    // First, let's see the current state of the users table
    const currentUsers = await dataSource.query('SELECT id, name, email, role FROM users');
    console.log('\nCurrent users in database:');
    currentUsers.forEach((user: any) => {
      console.log(`- ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Role: "${user.role}" (type: ${typeof user.role})`);
    });

    // Update all users with 'editor' role to 'user'
    const editorToUserResult = await dataSource.query(
      "UPDATE users SET role = 'user' WHERE role = 'editor'"
    );
    console.log(`\nUpdated ${editorToUserResult.affectedRows} users from 'editor' to 'user'`);

    // Update all users with NULL or empty role to 'user'
    const nullToUserResult = await dataSource.query(
      "UPDATE users SET role = 'user' WHERE role IS NULL OR role = '' OR role = 'null'"
    );
    console.log(`Updated ${nullToUserResult.affectedRows} users from NULL/empty to 'user'`);

    // Show final state
    const finalUsers = await dataSource.query('SELECT id, name, email, role FROM users');
    console.log('\nFinal users state:');
    finalUsers.forEach((user: any) => {
      console.log(`- ${user.name} (${user.email}): ${user.role}`);
    });

  } catch (error) {
    console.error('Error fixing user roles:', error);
  } finally {
    await dataSource.destroy();
    console.log('\nDatabase connection closed');
  }
}

// Run the fix if this file is executed directly
if (require.main === module) {
  require('dotenv').config();
  fixUserRolesDirect();
}