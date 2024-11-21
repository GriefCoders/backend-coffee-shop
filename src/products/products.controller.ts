import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductCreateDto } from './dto/product-create';
import { ProductuUdateDto } from './dto/product-update';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(@Query('search') search?: string) {
    if (search) {
      return this.productsService.search(search);
    }
    return this.productsService.getAll();
  }

  @Get(':id')
  async getOneProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getOne(id);
  }

  @Get('/category/:id')
  async getByCategory(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getByCategory(id);
  }

  @Post()
  async createProduct(
    @Body()
    productDto: ProductCreateDto,
  ) {
    return this.productsService.createProduct(productDto);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateDto: ProductuUdateDto,
  ) {
    return this.productsService.updateProduct(id, updateDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }
}
