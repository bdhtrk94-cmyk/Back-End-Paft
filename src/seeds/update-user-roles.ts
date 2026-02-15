import { DataSource } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';

export async function updateUserRoles() {
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

    // Update all users with role 'editor' to 'user'
    const result = await dataSource
      .createQueryBuilder()
      .update(User)
      .set({ role: UserRole.USER })
      .where('role = :oldRole', { oldRole: 'editor' })
      .execute();

    console.log(`Updated ${result.affected} users from 'editor' to 'user' role`);

    // Show current user roles
    const users = await dataSource
      .createQueryBuilder(User, 'user')
      .select(['user.id', 'user.name', 'user.email', 'user.role'])
      .getMany();

    console.log('\nCurrent users:');
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}): ${user.role || 'NO ROLE'}`);
    });

    // Update any users with null/undefined roles to 'user'
    const nullRoleResult = await dataSource
      .createQueryBuilder()
      .update(User)
      .set({ role: UserRole.USER })
      .where('role IS NULL OR role = ""')
      .execute();

    if (nullRoleResult.affected && nullRoleResult.affected > 0) {
      console.log(`\nUpdated ${nullRoleResult.affected} users with null/empty roles to 'user'`);
      
      // Show updated users
      const updatedUsers = await dataSource
        .createQueryBuilder(User, 'user')
        .select(['user.id', 'user.name', 'user.email', 'user.role'])
        .getMany();

      console.log('\nUpdated users:');
      updatedUsers.forEach(user => {
        console.log(`- ${user.name} (${user.email}): ${user.role}`);
      });
    }

  } catch (error) {
    console.error('Error updating user roles:', error);
  } finally {
    await dataSource.destroy();
    console.log('Database connection closed');
  }
}

// Run the update if this file is executed directly
if (require.main === module) {
  require('dotenv').config();
  updateUserRoles();
}