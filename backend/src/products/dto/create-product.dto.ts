import { IsString,IsNumber,IsBoolean} from "class-validator";

export class CreateProductDto {
@IsString()
name:string

@IsString()
description:string

@IsNumber()
price:number

@IsNumber()
categoriesId:number

@IsBoolean()
stock?:boolean
}
