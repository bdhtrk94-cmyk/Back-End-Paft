import { DataSource } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';

export async function testUserRegistration() {
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
    console.log('✅ Database connection established');

    // Create a test user without specifying role (should default to USER)
    const userRepository = dataSource.getRepository(User);
    
    // Check if test user already exists
    const existingUser = await userRepository.findOne({ 
      where: { email: 'testuser@example.com' } 
    });
    
    if (existingUser) {
      console.log('🗑️ Removing existing test user...');
      await userRepository.remove(existingUser);
    }

    // Create new test user
    const testUser = userRepository.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'hashedpassword123', // In real app, this would be hashed
      // Note: We're NOT setting role, so it should use the default
    });

    const savedUser = await userRepository.save(testUser);
    
    console.log('\n👤 Test User Created:');
    console.log(`- ID: ${savedUser.id}`);
    console.log(`- Name: ${savedUser.name}`);
    console.log(`- Email: ${savedUser.email}`);
    console.log(`- Role: ${savedUser.role} ${savedUser.role === UserRole.USER ? '✅' : '❌'}`);
    
    if (savedUser.role === UserRole.USER) {
      console.log('\n🎉 SUCCESS: New users default to USER role!');
    } else {
      console.log('\n❌ FAILED: New users are not defaulting to USER role');
    }

    // Clean up test user
    await userRepository.remove(savedUser);
    console.log('🧹 Test user cleaned up');

  } catch (error) {
    console.error('❌ Error testing user registration:', error);
  } finally {
    await dataSource.destroy();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  require('dotenv').config();
  testUserRegistration();
}