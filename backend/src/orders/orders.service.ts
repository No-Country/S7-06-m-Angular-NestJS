import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order, OrderItem } from './entities';
import { User } from '../auth/entities/auth.entity';
import { Product } from '../products/entities';

import { CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger('OrderService');

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: User) {
    try {
      const { orderItems, ...orderData } = createOrderDto;

      if (orderItems && orderItems.length === 0)
        throw new BadRequestException('No order items');

      const order = this.orderRepository.create({
        ...orderData,
        user,
      });
      await this.orderRepository.save(order);

      orderItems.map(async (item) => {
        const product = await this.productRepository.findOneBy({
          id: item.id,
        });

        const productItem = this.orderItemRepository.create({
          name: product.name,
          price: product.price * item.quantity,
          product: product,
          quantity: item.quantity,
          order,
        });

        order.items = [productItem];

        await this.orderItemRepository.save(productItem);
      });

      return { order };
    } catch (error) {
      this.handleDBError(error);
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
