import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findCart(userId: number) {
    return await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        cartProduct: {
          include: { product: true },
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
  }

  async addToCart(userId: number, productId: number, quantity: number = 1) {
    const cart = await this.findCart(userId);
    if (!cart) {
      const newCart = await this.prisma.cart.create({
        data: {
          userId,
          cartProduct: {
            create: {
              productId,
              quantity,
            },
          },
        },
      });
      return newCart;
    }
    const cartProduct = cart.cartProduct.find(
      (item) => item.productId === productId,
    );
    if (cartProduct) {
      return await this.prisma.cartProduct.update({
        where: { id: cartProduct.id },
        data: {
          quantity: cartProduct.quantity + quantity,
        },
      });
    }
    return await this.prisma.cartProduct.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  async removeFromCart(userId: number, productId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId: Number(userId) },
      include: { cartProduct: true },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    const cartProduct = cart.cartProduct.find(
      (item) => item.productId === productId,
    );
    if (!cartProduct) {
      throw new NotFoundException('Product not found in cart');
    }
    if (cartProduct.quantity > 1) {
      return await this.prisma.cartProduct.update({
        where: { id: cartProduct.id },
        data: {
          quantity: cartProduct.quantity - 1,
        },
      });
    }
    return await this.prisma.cartProduct.delete({
      where: { id: cartProduct.id },
    });
  }

  async decreaseQuantity(
    userId: number,
    productId: number,
    quantity: number = 1,
  ) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId: Number(userId) },
      include: { cartProduct: true },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    const cartProduct = cart.cartProduct.find(
      (item) => item.productId === productId,
    );
    if (!cartProduct) {
      throw new NotFoundException('Product not found in cart');
    }
    if (cartProduct.quantity > quantity) {
      return await this.prisma.cartProduct.update({
        where: { id: cartProduct.id },
        data: {
          quantity: cartProduct.quantity - quantity,
        },
      });
    }
    return await this.prisma.cartProduct.delete({
      where: { id: cartProduct.id },
    });
  }
}
