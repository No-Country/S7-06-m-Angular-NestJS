// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto{
    @IsBoolean()    
    isPaid:boolean

    @IsString()
    @IsOptional()
    paidAt?:Date
}
