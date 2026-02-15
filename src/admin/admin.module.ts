import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { PagesModule } from '../pages/pages.module';
import { SiteContentModule } from '../site-content/site-content.module';

@Module({
  imports: [UsersModule, ProductsModule, PagesModule, SiteContentModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}