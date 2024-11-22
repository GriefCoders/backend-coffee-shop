import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async getCart(userId: number) {
    return this.cartRepository.findCart(userId);
  }

  async addToCart(userId: number, productId: number, quantity: number = 1) {
    return this.cartRepository.addToCart(userId, productId, quantity);
  }

  async removeFromCart(userId: number, productId: number) {
    return this.cartRepository.removeFromCart(userId, productId);
  }

  async decreaseQuantity(
    userId: number,
    productId: number,
    quantity: number = 1,
  ) {
    return this.cartRepository.decreaseQuantity(userId, productId, quantity);
  }
}
