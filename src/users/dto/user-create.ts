import { IsOptional, IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  role?: string;
}
