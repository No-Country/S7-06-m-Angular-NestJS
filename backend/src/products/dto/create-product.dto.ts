import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';

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

  @ApiProperty({
    description: 'Product description',
    nullable: false,
    minLength: 1,
    default: 'Sirve para escribir en color verde',
  })
  @IsString()
  @MinLength(1)
  description: string;

  @ApiProperty({
    description: 'Product price',
    nullable: false,
    minLength: 1,
    default: 10.0,
  })
  @IsString()
  @IsOptional()
  price?: string;

  @ApiProperty({
    description: 'Product category',
    nullable: false,
    minLength: 1,
    default: 'esferos',
  })
  @IsString()
  @MinLength(1)
  category_name: string;

  @ApiProperty({
    description: 'Product image',
    nullable: false,
    default: 'You must upload image',
  })
  images: string[];

  categories: Category;
}
