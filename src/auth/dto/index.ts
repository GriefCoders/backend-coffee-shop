import { IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  role: string;
}

export class LoginUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
}
