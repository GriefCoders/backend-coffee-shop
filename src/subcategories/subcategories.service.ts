import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { SubcategoriesRepository } from './subcategory.repository';
import { SubcategoryCreateDto } from './dto/subcategory-create';
import { SubcategoryUpdateDto } from './dto/subcategory-update';

@Injectable()
export class SubcategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subcategoriesRepository: SubcategoriesRepository,
  ) {}

  async getAll() {
    return this.subcategoriesRepository.findAllSubcategories();
  }

  async getOne(id: number) {
    return this.subcategoriesRepository.findOneSubcategory(id);
  }

  async create(dto: SubcategoryCreateDto) {
    return this.subcategoriesRepository.create(dto);
  }

  async update(dto: SubcategoryUpdateDto, id: number) {
    return this.subcategoriesRepository.update(dto, id);
  }

  async delete(id: number) {
    return this.subcategoriesRepository.delete(id);
  }
}
