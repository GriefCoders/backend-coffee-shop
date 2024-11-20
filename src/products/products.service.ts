import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async search(params: { query: string }) {
    const { query } = params;
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
  }

  async getAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ProductWhereInput;
  }) {
    const { skip, take, where } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      orderBy: {
        id: 'asc',
      },
      where,
      include: { productCategory: true },
    });
  }

  async getOne(id: Prisma.ProductWhereUniqueInput) {
    return this.prisma.product.findUnique({
      where: id,
      include: { productCategory: true },
    });
  }

  async getByCategory(id: number) {
    return this.prisma.product.findMany({
      where: { productCategoryId: id },
      include: { productCategory: true },
    });
  }

  async createProduct(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }) {
    const { data, where } = params;
    return this.prisma.product.update({ data, where });
  }

  async deleteProduct(id: Prisma.ProductWhereUniqueInput) {
    return this.prisma.product.delete({
      where: id,
    });
  }

  async delete(id: Prisma.ProductWhereUniqueInput) {
    return this.prisma.product.delete({ where: id });
  }
}
