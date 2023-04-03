import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  date: string;
}
