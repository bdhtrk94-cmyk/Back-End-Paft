import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// Load environment variables
config();

async function updateAdminToSuperAdmin() {
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

    // Update admin user to super_admin
    console.log('👤 Updating Admin User to Super Admin...');
    
    const result = await dataSource.query(`
      UPDATE users 
      SET role = 'super_admin', updated_at = NOW() 
      WHERE email = 'admin@paft.com'
    `);
    
    if (result.affectedRows > 0) {
      console.log('✅ Admin user updated to super_admin role');
    } else {
      console.log('❌ No user found with email admin@paft.com');
    }

    // Also update Abdelrahman if exists
    const abdelrahmanResult = await dataSource.query(`
      UPDATE users 
      SET role = 'super_admin', updated_at = NOW() 
      WHERE email LIKE '%abdelrahman%'
    `);
    
    if (abdelrahmanResult.affectedRows > 0) {
      console.log('✅ Abdelrahman user updated to super_admin role');
    }

    // Show updated users
    console.log('\n👥 Updated Users:');
    const users = await dataSource.query('SELECT id, name, email, role FROM users');
    users.forEach((user: any) => {
      console.log(`${user.id}. ${user.name} (${user.email}) - Role: ${user.role}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await dataSource.destroy();
    console.log('\n🔌 Database connection closed');
  }
}

updateAdminToSuperAdmin();