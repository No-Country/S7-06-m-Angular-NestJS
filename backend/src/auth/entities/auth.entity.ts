import { ApiProperty } from '@nestjs/swagger';
import {
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', { unique: true })
  email: string;

  @ApiProperty()
  @Column('text', { select: false })
  password: string;

  @ApiProperty()
  @Column('text')
  firstName: string;

  @ApiProperty()
  @Column('text')
  lastName: string;

  @ApiProperty()
  @Column('text')
  contact?: string;

  @ApiProperty()
  @Column('text')
  address?: string;

  @ApiProperty()
  @Column('bool', { default: true })
  isActive: boolean;

  @ApiProperty()
  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
