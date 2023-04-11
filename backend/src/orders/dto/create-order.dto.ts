import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
} from 'class-validator';
import { OrderItem } from 'src/orders/entities/order-item.entity';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  paidAt?: string;

  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;

  // @IsNumber()
  // @IsOptional()
  // taxPrice?: number;

  @IsNumber()
  totalPrice: number;

  @IsArray()
  orderItems: OrderItem[];
}
