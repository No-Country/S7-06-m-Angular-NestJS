import { IsString, IsDecimal, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsDecimal()
  price: number;
}
