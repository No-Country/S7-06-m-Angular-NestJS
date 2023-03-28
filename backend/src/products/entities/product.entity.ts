import { Category } from "src/categories/entities/category.entity";
import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinTable} from "typeorm";

@Entity("products")
export class Product {
@PrimaryGeneratedColumn("increment")
id:number

@Column("text",{unique:true})
name:string

@Column("text")
description:string

@Column("float")
price:number

@Column("boolean",{default:true,nullable:true})
stock?:boolean


@Column()
categoriesId:number


@ManyToOne(()=>Category,category=>category.products)
categories:Category

}
