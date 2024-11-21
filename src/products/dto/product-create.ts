import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  img: string;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  productCategoryId?: number;
}
