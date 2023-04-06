import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities';

export class CreateOrderItemDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  order_id: string;

  @IsOptional()
  order: Order;

  product: Product;

  // name: string;
}
