import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('text')
  description: string;

  @Column('float')
  price: number;

  @Column('boolean', { default: true })
  stock: boolean;
}
