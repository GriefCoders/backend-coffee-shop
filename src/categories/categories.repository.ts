import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryCreateDto } from './dto/category-create';
import { CategoryUpdateDto } from './dto/category-update';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCategories() {
    return this.prisma.category.findMany({
      include: { subCategory: true },
      orderBy: { id: 'asc' },
    });
  }

  async findOneCategory(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async create(category: CategoryCreateDto) {
    return this.prisma.category.create({ data: { ...category } });
  }

  async update(id: number, category: CategoryUpdateDto) {
    return this.prisma.category.update({
      where: { id },
      data: { ...category },
      include: { subCategory: true },
    });
  }

  async delete(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
