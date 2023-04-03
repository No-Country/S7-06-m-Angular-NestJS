import { IsString,IsDecimal,IsNumber, } from "class-validator";

export class CreateOrderItemDto {

@IsString()
name:String

@IsNumber()
quantity:number

@IsDecimal()
price:number
}
