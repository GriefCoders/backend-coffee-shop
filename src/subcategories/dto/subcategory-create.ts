import { IsString } from 'class-validator';

export class SubcategoryCreateDto {
  @IsString()
  name: string;

  @IsString()
  img: string;
}
