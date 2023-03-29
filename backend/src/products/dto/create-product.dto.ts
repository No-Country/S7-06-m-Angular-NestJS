import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  categoriesId: string;

  @IsBoolean()
  stock?: boolean;
}
