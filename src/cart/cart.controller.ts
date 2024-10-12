import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(
    @Body()
    addToCartDto: {
      userId: number;
      productId: number;
      quantity?: number;
    },
  ) {
    const { userId, productId, quantity } = addToCartDto;
    return await this.cartService.addToCart(userId, productId, quantity || 1);
  }

  @Delete('remove')
  async removeFromCart(
    @Body() removeFromCartDto: { userId: number; productId: number },
  ) {
    const { userId, productId } = removeFromCartDto;
    return await this.cartService.removeFromCart(userId, productId);
  }

  @Patch('decrease')
  async decreaseQuantity(
    @Body()
    decreaseQuantityDto: {
      userId: number;
      productId: number;
      quantity: number;
    },
  ) {
    const { userId, productId, quantity } = decreaseQuantityDto;
    return await this.cartService.decreaseQuantity(userId, productId, quantity);
  }

  @Get(':userId')
  async getCart(@Param('userId') userId: number) {
    return await this.cartService.getCart(Number(userId));
  }
}
