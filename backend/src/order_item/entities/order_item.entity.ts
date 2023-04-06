import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column('text')
  // name: string;

  @Column('float')
  quantity: number;

  @Column('float')
  price: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;
}
