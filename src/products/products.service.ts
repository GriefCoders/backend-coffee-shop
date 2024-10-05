import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(params: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
    where?: Prisma.ProductWhereInput;
  }) {
    const { skip, take, orderBy, where } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      orderBy,
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
}
