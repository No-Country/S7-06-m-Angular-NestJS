import {
  IsString,
  IsNumber,
  IsBoolean,
  MinLength,
  IsOptional,
} from 'class-validator';
import { Category } from '../../categories/entities/category.entity';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @MinLength(1)
  categorie_name: string;

  categories: Category;
}
