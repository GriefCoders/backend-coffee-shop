import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SubcategoryCreateDto } from './dto/subcategory-create';
import { SubcategoryUpdateDto } from './dto/subcategory-update';

@Injectable()
export class SubcategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllSubcategories() {
    return this.prisma.subCategory.findMany();
  }

  async findOneSubcategory(id: number) {
    return this.prisma.subCategory.findUnique({ where: { id } });
  }

  async create(subcategory: SubcategoryCreateDto) {
    return this.prisma.subCategory.create({ data: { ...subcategory } });
  }

  async update(subcategory: SubcategoryUpdateDto, id: number) {
    return this.prisma.subCategory.update({
      where: { id },
      data: { ...subcategory },
    });
  }

  async delete(id: number) {
    return this.prisma.subCategory.delete({ where: { id } });
  }
}
