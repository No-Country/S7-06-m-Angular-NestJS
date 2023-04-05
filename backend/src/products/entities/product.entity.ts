import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

import { Category } from '../../categories/entities/category.entity';
import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/auth.entity';
import { OrderItem } from 'src/order_item/entities/order_item.entity';

@Entity('products')
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', { unique: true })
  name: string;

  @ApiProperty()
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty()
  @Column('float', { default: 0 })
  price: number;

  @ApiProperty()
  @Column('boolean', { default: true })
  stock: boolean;

  @ApiProperty()
  @ManyToOne(() => Category, (category) => category.products)
  categories: Category;

  @ApiProperty()
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @ApiProperty()
  @OneToMany(() => OrderItem, (oi) => oi.product)
  orderItems: OrderItem[];

  @BeforeInsert()
  charatersLowercase() {
    this.name = this.name.toLowerCase();
    this.description = this.description.toLowerCase();
  }
}
