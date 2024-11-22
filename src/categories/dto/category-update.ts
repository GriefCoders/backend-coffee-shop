import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryUpdateDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  subCategoryId?: number[];
}
