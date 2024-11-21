import { IsOptional, IsString } from 'class-validator';

export class SubcategoryUpdateDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  img?: string;
}
