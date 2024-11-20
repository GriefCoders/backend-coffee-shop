import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
// import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './dto/user-create';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(user: UserCreateDto) {
    return this.prisma.user.create({
      data: { ...user },
    });
  }

  async createAdmin(user: UserCreateDto) {
    return this.prisma.user.create({
      data: { ...user },
    });
  }
}
