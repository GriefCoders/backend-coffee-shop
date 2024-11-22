import { IsNumber, IsString } from 'class-validator';

export class CategoryCreateDto {
  @IsString()
  name: string;

  @IsNumber()
  subCategoryId?: number[];
}
