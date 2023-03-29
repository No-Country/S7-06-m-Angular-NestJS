import { Category } from "src/categories/entities/category.entity";
import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,BeforeInsert} from "typeorm";

@Entity("products")
export class Product {
@PrimaryGeneratedColumn("uuid")
id:string

@Column("text",{unique:true})
name:string

@Column("text")
description:string

@Column("float")
price:number

@Column("boolean",{default:true,nullable:true})
stock?:boolean


@Column()
categoriesId:string


@ManyToOne(()=>Category,category=>category.products)
categories:Category

@BeforeInsert()
    charatersLowercase() {
        this.name = this.name.toLowerCase()
        this.description = this.name.toLowerCase();
    }

}
