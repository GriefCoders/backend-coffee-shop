import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { PasswordService } from 'src/password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userDto: LoginUserDto): Promise<any> {
    const user = await this.userService.findByEmail(userDto.email);
    if (
      user &&
      (await this.passwordService.comparePassword(
        userDto.password,
        user.password,
      ))
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto: LoginUserDto) {
    const { id } = await this.userService.findByEmail(userDto.email);

    const payload = { email: userDto.email, sub: id, role: userDto.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: userDto.role,
      id: id,
    };
  }

  async register(userDto: RegisterUserDto) {
    const { id } = await this.userService.createUser(userDto);
    const payload = { email: userDto.email, sub: id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
