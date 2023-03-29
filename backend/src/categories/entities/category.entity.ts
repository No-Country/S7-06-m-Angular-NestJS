import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';

import { Product } from '../../products/entities/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.categories)
  products: Product[];

  @BeforeInsert()
  charatersLowercase() {
    this.name = this.name.toLowerCase();
  }
}
