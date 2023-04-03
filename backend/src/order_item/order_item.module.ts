import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemService } from './order_item.service';
import { OrderItemController } from './order_item.controller';
import { OrderItem } from './entities/order_item.entity';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService],
  imports: [TypeOrmModule.forFeature([OrderItem])],
})
export class OrderItemModule {}
