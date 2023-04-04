import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/auth.entity';
import { OrderItem } from 'src/order_item/entities/order_item.entity';

@Entity('orders')
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('decimal', { default: 0 })
  totalPrice: number;

  @ApiProperty()
  @Column('decimal', { default: 0 })
  taxPrice: number;

  @ApiProperty()
  @Column('boolean', { nullable: true })
  isPaid: boolean;

  @ApiProperty()
  @Column('date')
  createdAt: string;

  @ApiProperty()
  @Column('date', { nullable: true })
  paidAt: string;

  @ManyToOne(() => User, (user) => user.orders)
  users: User;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem;


  @BeforeInsert()
  taxPriceInsert() {
    this.taxPrice=this.totalPrice/12
  }

  @BeforeUpdate()
  taxPriceUpdate() {
    this.taxPrice=this.totalPrice/12
  }
}
