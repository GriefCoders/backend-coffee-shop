import { PasswordService } from './../password/password.service';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserCreateDto } from './dto/user-create';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async createUser(user: UserCreateDto) {
    const hashedPassword = await this.passwordService.hashPassword(
      user.password,
    );

    return this.usersRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  async createAdmin(user: UserCreateDto) {
    const hashedPassword = await this.passwordService.hashPassword(
      user.password,
    );

    return this.usersRepository.createAdmin({
      ...user,
      password: hashedPassword,
      role: 'admin',
    });
  }
}
