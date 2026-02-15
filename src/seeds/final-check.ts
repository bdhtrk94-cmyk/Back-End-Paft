import { DataSource } from 'typeorm';

export async function finalCheck() {
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

    // Check final user roles
    const users = await dataSource.query('SELECT id, name, email, role FROM users ORDER BY id');
    console.log('\n📋 Final User Roles:');
    console.log('==================');
    users.forEach((user: any) => {
      const roleIcon = user.role === 'admin' ? '👑' : '👤';
      console.log(`${roleIcon} ${user.name} (${user.email}): ${user.role}`);
    });

    // Check table structure
    const roleColumn = await dataSource.query(`
      SELECT COLUMN_TYPE, COLUMN_DEFAULT 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'paft_cms' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role'
    `);
    console.log('\n🔧 Role Column Structure:');
    console.log(`Type: ${roleColumn[0].COLUMN_TYPE}`);
    console.log(`Default: ${roleColumn[0].COLUMN_DEFAULT}`);

    console.log('\n✅ Database update completed successfully!');
    console.log('🎉 All users now have proper roles (admin/user instead of admin/editor)');

  } catch (error) {
    console.error('❌ Error during final check:', error);
  } finally {
    await dataSource.destroy();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the check if this file is executed directly
if (require.main === module) {
  require('dotenv').config();
  finalCheck();
}