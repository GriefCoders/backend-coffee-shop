import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma.service';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, SubcategoriesModule, CategoriesModule, UsersModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
