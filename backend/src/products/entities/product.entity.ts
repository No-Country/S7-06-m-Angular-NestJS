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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('float', { default: 0 })
  price: number;

  @Column('boolean', { default: true })
  stock: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  categories: Category;

  @BeforeInsert()
  charatersLowercase() {
    this.name = this.name.toLowerCase();
    this.description = this.description.toLowerCase();
  }
}
