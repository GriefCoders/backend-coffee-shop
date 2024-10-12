import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(@Query('search') search?: string) {
    if (search) {
      return this.productsService.search({ query: search });
    }
    return this.productsService.getAll({});
  }

  @Get(':id')
  async getOneProduct(@Param('id') id: string) {
    return this.productsService.getOne({ id: Number(id) });
  }

  @Get('/category/:id')
  async getByCategory(@Param('id') id: string) {
    return this.productsService.getByCategory(Number(id));
  }

  @Post()
  async createProduct(
    @Body()
    productData: {
      name: string;
      description: string;
      img: string;
      price: number;
      productCategoryId?: number;
    },
  ) {
    const { name, description, img, price, productCategoryId } = productData;
    return this.productsService.createProduct({
      name,
      description,
      img,
      price,
      productCategory: productCategoryId
        ? { connect: { id: productCategoryId } }
        : undefined,
    });
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body()
    updateData: {
      name?: string;
      description?: string;
      img?: string;
      price?: number;
      productCategoryId?: number;
    },
  ) {
    const { name, description, img, price, productCategoryId } = updateData;

    return this.productsService.updateProduct({
      where: { id: Number(id) },
      data: {
        name,
        description,
        img,
        price,
        productCategory: productCategoryId
          ? { connect: { id: productCategoryId } }
          : undefined,
      },
    });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.delete({ id: Number(id) });
  }

  // @Delete(':id')
  // async deleteProduct(@Param('id') id: string) {
  //   try {
  //     return await this.productsService.delete({ id: Number(id) });
  //   } catch (error) {
  //     throw new BadRequestException(error.message); // Handle error gracefully
  //   }
  // }
}
