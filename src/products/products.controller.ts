import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return this.productsService.getAll({});
  }

  // @Get()
  // async getAllSearch(@Query() search: string) {
  //   return this.productsService.getAll({
  //     where: { name: { contains: search } },
  //   });
  // }

  @Get('/:id')
  async getOneProduct(@Param('id') id: string) {
    return this.productsService.getOne({ id: Number(id) });
  }

  @Post()
  async createProduct(
    @Body()
    productData: {
      name: string;
      description: string;
      img: string;
      price: number;
      subCategoryName: string;
    },
  ) {
    const { name, description, img, price, subCategoryName } = productData;
    return this.productsService.createProduct({
      name,
      description,
      img,
      price,
      productCategory: {
        connect: { name: subCategoryName },
      },
    });
  }

  @Put(':id')
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
}
