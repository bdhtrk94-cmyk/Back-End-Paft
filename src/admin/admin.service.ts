import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { PagesService } from '../pages/pages.service';
import { SiteContentService } from '../site-content/site-content.service';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly pagesService: PagesService,
    private readonly siteContentService: SiteContentService,
  ) {}

  async getDashboardStats() {
    const [usersCount, productsCount, pagesCount, contentCount] = await Promise.all([
      this.usersService.count(),
      this.productsService.count(),
      this.pagesService.count(),
      this.siteContentService.count(),
    ]);

    return {
      users: usersCount,
      products: productsCount,
      pages: pagesCount,
      siteContent: contentCount,
    };
  }

  async getAllUsers() {
    const users = await this.usersService.findAll();
    // Remove password field from response
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async updateUserRole(userId: number, newRole: UserRole) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Protect super admin accounts from role changes
    if (user.role === UserRole.SUPER_ADMIN) {
      throw new BadRequestException('Cannot modify super admin role - super admin accounts are protected');
    }

    // Also protect specific super admin emails
    if (user.email === 'admin@paft.com' || user.email === 'abdelrahman@paft.eg' || user.email.includes('abdelrahman')) {
      throw new BadRequestException('Cannot modify super admin role - this account is protected');
    }

    if (user.role === newRole) {
      throw new BadRequestException('User already has this role');
    }

    return this.usersService.updateRole(userId, newRole);
  }

  async deleteUser(userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Also protect specific super admin emails
    if (user.email === 'admin@paft.com' || user.email === 'abdelrahman@paft.eg' || user.email.includes('abdelrahman')) {
      throw new BadRequestException('Cannot delete super admin account - this account is protected');
    }

    // Prevent deleting the last admin or super admin
    if (user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN) {
      const adminCount = await this.usersService.countByRole(UserRole.ADMIN);
      const superAdminCount = await this.usersService.countByRole(UserRole.SUPER_ADMIN);
      if ((adminCount + superAdminCount) <= 1) {
        throw new BadRequestException('Cannot delete the last admin user');
      }
      
      // Additional protection for super admin accounts
      if (user.role === UserRole.SUPER_ADMIN) {
        throw new BadRequestException('Cannot delete super admin account - super admin accounts are protected');
      }
    }

    return this.usersService.remove(userId);
  }

  async createUser(userData: { name: string; email: string; password: string; role: UserRole }) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    return this.usersService.create(userData);
  }
}