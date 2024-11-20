import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma.service';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [
    ProductsModule,
    SubcategoriesModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
    CartModule,
    PasswordModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
