import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';

import { Category } from '../../categories/entities/category.entity';

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

  @BeforeInsert()
  charatersLowercase() {
    this.name = this.name.toLowerCase();
    this.description = this.description.toLowerCase();
  }
}
