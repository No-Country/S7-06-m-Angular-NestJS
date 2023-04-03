import { PartialType } from '@nestjs/swagger';
import { CreateOrderItemDto } from './create-order_item.dto';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
