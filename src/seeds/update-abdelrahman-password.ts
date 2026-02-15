import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export async function updateAbdelrahmanPassword() {
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
      where: { email: 'Abdelrahman@gmail.com' }
    });

    if (abdelrahman) {
      // Hash new password
      const newPassword = 'admin123';
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Update password
      await userRepository.update(abdelrahman.id, { password: hashedPassword });
      console.log(`✅ Updated password for ${abdelrahman.email}`);
      console.log(`✅ New password: ${newPassword}`);
      
      // Verify the update
      const updatedUser = await userRepository.findOne({ where: { id: abdelrahman.id } });
      console.log(`✅ Verification: Password updated successfully`);
    } else {
      console.log('❌ Abdelrahman user not found');
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
  updateAbdelrahmanPassword();
}