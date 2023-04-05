import {IsDecimal, IsNumber, } from 'class-validator';

export class UpdateOrderItemDto {
    @IsNumber()
    quantity: number;
  
    @IsDecimal()
    price: number;
}
