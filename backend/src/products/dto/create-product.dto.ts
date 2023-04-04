import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  MinLength,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Category } from '../../categories/entities/category.entity';
import { OrderItem } from 'src/order_item/entities/order_item.entity';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name (unique)',
    nullable: false,
    minLength: 1,
    default: 'Esfero Verde',
  })
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
  @IsOptional()
  categorie_name?: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];

  categories: Category;
}
