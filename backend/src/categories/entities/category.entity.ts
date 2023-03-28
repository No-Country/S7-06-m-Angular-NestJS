import { Product } from "src/products/entities/product.entity";
import { Entity,PrimaryGeneratedColumn,Column,OneToMany } from "typeorm";

@Entity("categories")
export class Category {
@PrimaryGeneratedColumn("increment")
id:number

@Column("text",{unique:true})
name:string

@OneToMany(()=>Product,product=>product.categories)
products:Product[]
}
