import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Patch(':id')
  async updateSubcategory(
    @Param('id') id: string,
    @Body() updateData: { name?: string; img?: string },
  ) {
    const { name, img } = updateData;
    return this.subcategoriesService.update({
      where: { id: Number(id) },
      data: { name, img },
    });
  }

  @Delete(':id')
  async deleteSubcategory(@Param('id') id: string) {
    return this.subcategoriesService.delete({ id: Number(id) });
  }
}
