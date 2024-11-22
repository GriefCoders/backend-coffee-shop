import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoryCreateDto } from './dto/category-create';
import { CategoryUpdateDto } from './dto/category-update';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoriesRepository) {}

  async getAll() {
    return this.categoryRepository.findAllCategories();
  }

  async getOne(id: number) {
    return this.categoryRepository.findOneCategory(id);
  }

  async create(dto: CategoryCreateDto) {
    const data = {
      name: dto.name,
      subCategory: dto.subCategoryId
        ? {
            connect: dto.subCategoryId.map((id) => ({ id })),
          }
        : undefined,
    };
    return this.categoryRepository.create(data);
  }

  async update(id: number, dto: CategoryUpdateDto) {
    const existingCategory = await this.getOne(id);
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    const updateData = {
      name: dto.name ?? existingCategory.name,
      subCategory: dto.subCategoryId
        ? {
            connect: dto.subCategoryId.map((id) => ({ id })),
          }
        : undefined,
    };
    return this.categoryRepository.update(id, updateData);
  }

  async delete(id: number) {
    return this.categoryRepository.delete(id);
  }
}
