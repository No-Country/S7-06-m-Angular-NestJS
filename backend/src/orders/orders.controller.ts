import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Auth, GetUser } from '../auth/decorators';
import { User } from 'src/auth/entities/auth.entity';
import { Roles } from 'src/auth/interfaces';
import { ApiResponse,ApiTags } from '@nestjs/swagger';
import { Order } from './entities';

@ApiTags("orders")
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @ApiResponse({
    status: 201,
    description: 'order was create',
    type: Order,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (Unexpected error, check server logs)',
  })
  @Auth(Roles.User,Roles.Admin)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: User) {
    return this.ordersService.create(createOrderDto, user);
  }


  @ApiResponse({
    status: 201,
    description: 'found all order by user',
    type: Order,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (user dont exist or not login)',
  })
  @Auth(Roles.User,Roles.Admin)
  @Get()
  findAll(@GetUser() user:User) {
    return this.ordersService.findAll(user);
  }


  @ApiResponse({
    status: 201,
    description: 'find one order',
    type: Order,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (id incorret or order dont exist)',
  })
  @Get(':id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }


  @ApiResponse({
    status: 201,
    description: 'order was paid',
    type: Order,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (id incorret or order dont exist)',
  })
  @Patch(':id')
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }


  @ApiResponse({
    status: 201,
    description: 'order deleted succesful',
    type: Order,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (id incorret or order dont exist)',
  })
  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.ordersService.remove(id);
  }
}
