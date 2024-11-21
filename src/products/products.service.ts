import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductCreateDto } from './dto/product-create';
import { ProductuUdateDto } from './dto/product-update';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async search(query: string) {
    return this.productsRepository.search(query);
  }

  async getAll() {
    return this.productsRepository.findAllProducts();
  }

  async getOne(id: number) {
    return this.productsRepository.findOneProduct(id);
  }

  async getByCategory(id: number) {
    return this.productsRepository.findByCategory(id);
  }

  async createProduct(data: ProductCreateDto) {
    return this.productsRepository.createProduct(data);
  }

  async updateProduct(id: number, data: ProductuUdateDto) {
    return this.productsRepository.updateProduct(id, data);
  }

  async deleteProduct(id: number) {
    return this.productsRepository.deleteProduct(id);
  }
}
