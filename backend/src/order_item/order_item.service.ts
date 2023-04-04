import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/products/entities';
import { OrderItem } from './entities/order_item.entity';

import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(id: string, createOrderItemDto: CreateOrderItemDto) {
    const product = this.productRepository.findOne({ where: { id } });

    if (!product) throw new BadRequestException('Error, product dont exist');

    const orderItem = this.orderItemRepository.create({
      product,
      ...createOrderItemDto,
    });

    await this.productRepository.save(orderItem);

    return { orderItem };
  }

  findAll() {
    return `This action returns all orderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
