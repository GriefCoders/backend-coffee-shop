import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.category.findMany({ include: { subCategory: true } });
  }

  async getOne(id: Prisma.CategoryWhereUniqueInput) {
    return this.prisma.category.findUnique({ where: id });
  }

  async create(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({
      data,
      include: { subCategory: true },
    });
  }

  async update(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.CategoryUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.category.update({ where, data });
  }
}
