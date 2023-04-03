import { Module } from '@nestjs/common';
import { OrderItemService } from './order_item.service';
import { OrderItemController } from './order_item.controller';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService]
})
export class OrderItemModule {}
