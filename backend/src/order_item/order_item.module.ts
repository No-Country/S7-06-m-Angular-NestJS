import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemService } from './order_item.service';
import { OrderItemController } from './order_item.controller';
import { OrderItem } from './entities/order_item.entity';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/products/entities';
import { Order } from 'src/orders/entities/order.entity';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService],
  imports: [TypeOrmModule.forFeature([OrderItem,Product,Order]),ProductsModule,OrdersModule],
})
export class OrderItemModule {}
