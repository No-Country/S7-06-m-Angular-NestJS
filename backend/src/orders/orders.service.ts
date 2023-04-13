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

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async findAll(user: User) {
    const findUser = this.userRepository.findOneBy({ id: user.id });
    const orders = await this.orderRepository.find({
      where: { user: { id: user.id } },
    });
    if (!orders) throw new BadRequestException('this user dont have orders');
    return orders;
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) throw new BadRequestException('order no exist');
    return { order };
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const { isPaid } = updateOrderDto;

    if (isPaid == true) {
      const newDate = new Date(Date.now());
      updateOrderDto.paidAt = newDate;
    }

    const order = await this.orderRepository.findOneBy({ id });

    if (!order) throw new BadRequestException('order no exist');

    const newOrder = await this.orderRepository.preload({
      id,
      ...updateOrderDto,
    });

    await this.orderRepository.save(newOrder);

    return newOrder;
  }

  async remove(id: string) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) throw new BadRequestException('order no exist');
    this.orderRepository.remove(order);
    return { message: `order deleted successful` };
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
