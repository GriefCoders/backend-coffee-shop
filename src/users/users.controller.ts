import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('admin')
  async login(@Body() registerAdmin: UserCreateDto) {
    return this.userService.createAdmin(registerAdmin);
  }
}
