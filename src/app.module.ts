import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma.service';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ProductsModule, SubcategoriesModule, CategoriesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
