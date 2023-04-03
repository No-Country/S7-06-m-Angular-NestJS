import { ApiProperty} from '@nestjs/swagger';
import { Order } from 'src/orders/entities/order.entity';
import {
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @Column('text', { array: true, default: ['admin'] })
  roles: string[];

  @OneToMany(() => Order, (order) => order.users)
  orders: Order[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
