import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from './users.repository';
import { UserCreateDto } from './dto/user-create';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async createUser(user: UserCreateDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.usersRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  async createAdmin(user: UserCreateDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.usersRepository.createAdmin({
      ...user,
      password: hashedPassword,
      role: 'admin',
    });
  }
}
