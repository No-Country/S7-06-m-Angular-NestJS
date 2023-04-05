import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', { unique: true })
  name: string;

  @ApiProperty()
  @OneToMany(() => Product, (product) => product.categories)
  products: Product[];

  @BeforeInsert()
  charatersLowercase() {
    this.name = this.name.toLowerCase();
  }
}
