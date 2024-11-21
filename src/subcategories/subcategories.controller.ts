import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoryCreateDto } from './dto/subcategory-create';
import { SubcategoryUpdateDto } from './dto/subcategory-update';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Get()
  async getAllSubcategories() {
    return this.subcategoriesService.getAll();
  }

  @Get(':id')
  async getOneSubcategory(@Param('id', ParseIntPipe) id: number) {
    return this.subcategoriesService.getOne(id);
  }

  @Post()
  async createSubcategory(@Body() subcategoryDto: SubcategoryCreateDto) {
    return this.subcategoriesService.create(subcategoryDto);
  }

  @Patch(':id')
  async updateSubcategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: SubcategoryUpdateDto,
  ) {
    return this.subcategoriesService.update(updateDto, id);
  }

  @Delete(':id')
  async deleteSubcategory(@Param('id', ParseIntPipe) id: number) {
    return this.subcategoriesService.delete(id);
  }
}
