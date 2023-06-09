import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../auth/entities/auth.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';

@Entity('orders')
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('float', { default: 0 })
  totalPrice: number;

  // @ApiProperty()
  // @Column('float', { default: 12 })
  // taxPrice: number;

  @ApiProperty()
  @Column('boolean', { nullable: true, default: false })
  isPaid: boolean;

  @ApiProperty()
  @Type(() => Date)
  @Column('timestamp', { default: null })
  createdAt: Date;

  @ApiProperty()
  @Type(() => Date)
  @Column('timestamp', { nullable: true })
  paidAt: Date;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items: OrderItem[];

  @BeforeInsert()
  dateInsert(){
   this.createdAt=new Date()
  }


  // @BeforeInsert()
  // taxPriceInsert() {
  //   this.totalPrice = this.totalPrice / this.taxPrice;
  // }
}
