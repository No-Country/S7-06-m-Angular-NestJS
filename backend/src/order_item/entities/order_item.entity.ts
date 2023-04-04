import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities';

@Entity('orderItem')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('numeric')
  quantity: number;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;
}
