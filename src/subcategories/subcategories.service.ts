import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SubcategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.subCategory.findMany();
  }

  async getOne(id: Prisma.SubCategoryWhereUniqueInput) {
    return this.prisma.subCategory.findUnique({ where: id });
  }

  async create(data: Prisma.SubCategoryCreateInput) {
    return this.prisma.subCategory.create({
      data: {
        name: data.name,
        img: data.img,
      },
    });
  }

  async update(params: {
    where: Prisma.SubCategoryWhereUniqueInput;
    data: Prisma.SubCategoryUpdateInput;
  }) {
    const { data, where } = params;
    return this.prisma.subCategory.update({ data, where });
  }

  async delete(id: Prisma.SubCategoryWhereUniqueInput) {
    return this.prisma.subCategory.delete({ where: id });
  }
}
