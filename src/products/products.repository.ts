import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductCreateDto } from './dto/product-create';
import { ProductuUdateDto } from './dto/product-update';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneProduct(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async findAllProducts() {
    return this.prisma.product.findMany({
      orderBy: {
        id: 'asc',
      },
      include: { productCategory: true },
    });
  }

  async search(query: string) {
    return this.prisma.product.findMany({
      where: { name: { contains: query, mode: 'insensitive' } },
    });
  }

  async findByCategory(categoryId: number) {
    return this.prisma.product.findMany({
      where: { productCategoryId: categoryId },
      include: { productCategory: true },
    });
  }

  async createProduct(dto: ProductCreateDto) {
    return this.prisma.product.create({ data: { ...dto } });
  }

  async updateProduct(id: number, dto: ProductuUdateDto) {
    return this.prisma.product.update({ where: { id }, data: { ...dto } });
  }

  async deleteProduct(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
