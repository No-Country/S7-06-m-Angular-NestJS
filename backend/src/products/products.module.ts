import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product, ProductImage } from './entities';
import { Category } from '../categories/entities/category.entity';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { CategoriesModule } from '../categories/categories.module';

import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product, Category, ProductImage]),
    CategoriesModule,
    AuthModule,
    ConfigModule,
  ],
})
export class ProductsModule {}
