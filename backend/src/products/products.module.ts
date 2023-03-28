import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService,CategoriesService],
  imports:[TypeOrmModule.forFeature([Product,Category])]
})
export class ProductsModule {}
