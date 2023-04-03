import { Order } from "src/orders/entities/order.entity";
import { Entity,PrimaryGeneratedColumn,Column,ManyToOne } from "typeorm";

@Entity("orderItem")

export class OrderItem {

@PrimaryGeneratedColumn("uuid")
id:string

@Column("text")
name:string

@Column("number")
quantity:number

@Column("decimal")
price:number

@ManyToOne(()=>Order,(order)=>order.items)
order:Order
}
