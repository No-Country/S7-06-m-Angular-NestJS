import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm"
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto,UpdateProductDto} from './dto/';
import { Product } from './entities/product.entity';


@Injectable()
export class ProductsService {

constructor(
@InjectRepository(Product)
private productRepository: Repository<Product>
){}

  create(createProductDto: CreateProductDto) {
    return "";
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    return this.productRepository.findOne({where:{id}});
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
