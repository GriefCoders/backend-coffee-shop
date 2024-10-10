import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { Prisma } from '@prisma/client';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Get()
  async getAllSubcategories() {
    return this.subcategoriesService.getAll();
  }

  @Get(':id')
  async getOneSubcategory(@Param('id') id: string) {
    return this.subcategoriesService.getOne({ id: Number(id) });
  }

  @Post()
  async createSubcategory(
    @Body() subcategoryData: { name: string; img: string },
  ) {
    const { name, img } = subcategoryData;
    return this.subcategoriesService.create({ name, img });
  }

  @Delete(':id')
  async deleteSubcategory(@Param('id') id: string) {
    return this.subcategoriesService.delete({ id: Number(id) });
  }
}
