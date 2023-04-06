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
import { Type } from 'class-transformer';

@Entity('orders')
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('float', { default: 0 })
  totalPrice: number;

  @ApiProperty()
  @Column('float', { default: 0 })
  taxPrice: number;

  @ApiProperty()
  @Column('boolean', { nullable: true, default: false })
  isPaid: boolean;

  @ApiProperty()
  @Type(() => Date)
  @Column('date')
  createdAt: Date;

  @ApiProperty()
  @Type(() => Date)
  @Column('date', { nullable: true })
  paidAt: Date;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @BeforeInsert()
  formatearFechas() {
    const newDate = new Date(Date.now());

    this.createdAt = new Date(newDate.toLocaleString('es-ES'));
  }

  @BeforeUpdate()
  taxPriceUpdate() {
    this.taxPrice = this.totalPrice / 12;
  }
}
