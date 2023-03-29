import { Product } from "src/products/entities/product.entity";
import { Entity,PrimaryGeneratedColumn,Column,OneToMany,BeforeInsert } from "typeorm";

@Entity("categories")
export class Category {
@PrimaryGeneratedColumn("uuid")
id:string

@Column("text",{unique:true})
name:string

@OneToMany(()=>Product,product=>product.categories)
products:Product[]

@BeforeInsert()
    charatersLowercase() {
        this.name = this.name.toLowerCase()
    }
}
