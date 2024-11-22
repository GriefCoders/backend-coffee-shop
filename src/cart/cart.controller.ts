import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Get,
  Patch,
  ParseIntPipe,
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
    return await this.cartService.addToCart(
      addToCartDto.userId,
      addToCartDto.productId,
      addToCartDto.quantity || 1,
    );
  }

  @Delete('remove')
  async removeFromCart(
    @Body() removeFromCartDto: { userId: number; productId: number },
  ) {
    return await this.cartService.removeFromCart(
      removeFromCartDto.userId,
      removeFromCartDto.productId,
    );
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
    return await this.cartService.decreaseQuantity(
      decreaseQuantityDto.userId,
      decreaseQuantityDto.productId,
      decreaseQuantityDto.quantity,
    );
  }

  @Get(':userId')
  async getCart(@Param('userId', ParseIntPipe) userId: number) {
    return await this.cartService.getCart(userId);
  }
}
