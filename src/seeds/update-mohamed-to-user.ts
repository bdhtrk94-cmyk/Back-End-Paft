import { DataSource } from 'typeorm';

export async function updateMohamedToUser() {
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
    console.log('✅ Database connection established');

    // Update Mohamed to user role
    const updateResult = await dataSource.query(
      "UPDATE users SET role = 'user' WHERE email = 'Mohamed@gmail.com'"
    );
    console.log(`📝 Updated Mohamed's role: ${updateResult.affectedRows} rows affected`);

    // Verify the change
    const users = await dataSource.query('SELECT id, name, email, role FROM users ORDER BY id');
    console.log('\n👥 Current User Roles:');
    console.log('====================');
    users.forEach((user: any) => {
      const roleIcon = user.role === 'admin' ? '👑' : '👤';
      console.log(`${roleIcon} ${user.name} (${user.email}): ${user.role}`);
    });

    console.log('\n✅ Mohamed is now a regular user!');

  } catch (error) {
    console.error('❌ Error updating Mohamed:', error);
  } finally {
    await dataSource.destroy();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the update if this file is executed directly
if (require.main === module) {
  require('dotenv').config();
  updateMohamedToUser();
}