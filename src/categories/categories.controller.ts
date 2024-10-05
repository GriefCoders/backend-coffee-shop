import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Prisma } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return this.categoriesService.getAll();
  }

  @Get(':id')
  async getOneCategory(@Param('id') id: string) {
    const existingCategory = await this.categoriesService.getOne({
      id: Number(id),
    });
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.categoriesService.getOne({ id: Number(id) });
  }

  @Post()
  async createCategory(
    @Body() categoryData: { name: string; subCategoryId?: number[] },
  ) {
    const { name, subCategoryId } = categoryData;

    const createData: Prisma.CategoryCreateInput = {
      name,
      subCategory: subCategoryId
        ? {
            connect: subCategoryId.map((id) => ({ id })),
          }
        : undefined,
    };

    return this.categoriesService.create(createData);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryData: { name?: string; subCategoryId?: number[] },
  ) {
    const existingCategory = await this.categoriesService.getOne({
      id: Number(id),
    });
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    const updateData: Prisma.CategoryUpdateInput = {
      name: categoryData.name ?? existingCategory.name,
      subCategory: categoryData.subCategoryId
        ? {
            connect: categoryData.subCategoryId.map((id) => ({ id })),
          }
        : undefined,
    };

    return this.categoriesService.update({
      where: { id: Number(id) },
      data: updateData,
    });
  }
}
