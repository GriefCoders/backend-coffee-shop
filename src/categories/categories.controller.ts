import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryCreateDto } from './dto/category-create';
import { CategoryUpdateDto } from './dto/category-update';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return this.categoriesService.getAll();
  }

  @Get(':id')
  async getOneCategory(@Param('id', ParseIntPipe) id: number) {
    const existingCategory = await this.categoriesService.getOne(id);
    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.categoriesService.getOne(id);
  }

  @Post()
  async createCategory(@Body() categoryDto: CategoryCreateDto) {
    return this.categoriesService.create(categoryDto);
  }

  @Put(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryDto: CategoryUpdateDto,
  ) {
    return this.categoriesService.update(id, categoryDto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.delete(id);
  }
}
