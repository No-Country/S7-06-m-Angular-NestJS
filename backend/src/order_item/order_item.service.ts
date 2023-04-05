import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/products/entities';
import { OrderItem } from './entities/order_item.entity';

import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(id: string, createOrderItemDto: CreateOrderItemDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    const { order_id } = createOrderItemDto;
    const order = this.orderRepository.findOne({ where: { id: order_id } });
    if (!product) throw new BadRequestException('Error, product dont exist');

    const orderItem = this.orderItemRepository.create({
      order,
      product,
      ...createOrderItemDto,
    });

    await this.productRepository.save(orderItem);

    return orderItem;
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepository.findOne({ where: { id } });
    if (!orderItem)
      throw new BadRequestException('Error, product in cart dont exist');
    const update = await this.orderItemRepository.preload({
      id,
      ...updateOrderItemDto,
    });
    this.orderItemRepository.save(update);
    return update;
  }

  async remove(id: string) {
    const orderItem = await this.orderItemRepository.findOne({ where: { id } });
    if (!orderItem)
      throw new BadRequestException('Error, product in cart dont exist');
    const remove = await this.orderItemRepository.remove(orderItem);
    return { message: 'Product in order elimated', remove };
  }
}
