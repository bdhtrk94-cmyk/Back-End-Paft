import { DataSource } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';

export async function setAbdelrahmanSuperAdmin() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'paft_cms',
    entities: [User],
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    console.log('Database connection established');

    const userRepository = dataSource.getRepository(User);

    // Find Abdelrahman's account
    const abdelrahman = await userRepository.findOne({
      where: [
        { email: 'Abdelrahman@gmail.com' },
        { email: 'abdelrahman@paft.eg' },
        { email: 'abdelrahman.yasser@paft.eg' }
      ]
    });

    if (abdelrahman) {
      // Update to super admin
      await userRepository.update(abdelrahman.id, { role: UserRole.SUPER_ADMIN });
      console.log(`✅ Updated ${abdelrahman.email} to SUPER_ADMIN role`);
      
      // Verify the update
      const updatedUser = await userRepository.findOne({ where: { id: abdelrahman.id } });
      console.log(`✅ Verification: ${updatedUser?.email} role is now: ${updatedUser?.role}`);
    } else {
      console.log('❌ Abdelrahman user not found. Available users:');
      const allUsers = await userRepository.find();
      allUsers.forEach(user => {
        console.log(`- ${user.email} (${user.role})`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await dataSource.destroy();
    console.log('Database connection closed');
  }
}

// Run if called directly
if (require.main === module) {
  setAbdelrahmanSuperAdmin();
}