// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
