import { IsString,IsNumber,IsBoolean} from "class-validator";

export class CreateProductDto {
@IsString()
name:string

@IsString()
description:string

@IsNumber()
price:number

@IsString()
categoriesId:string

@IsBoolean()
stock?:boolean
}
