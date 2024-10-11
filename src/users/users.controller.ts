import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('admin')
  async login(@Body() body: { email: string; password: string; name: string }) {
    return this.userService.createAdmin(body.email, body.name, body.password);
  }
}
