import { IsString, IsDecimal, IsNumber, IsOptional } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities';

export class CreateOrderItemDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsDecimal()
  price: number;

  @IsString()
  order_id:string

  @IsOptional()
  order: Order;

  product: Product;
}
