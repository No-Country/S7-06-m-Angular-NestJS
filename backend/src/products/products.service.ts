import { Injectable,BadRequestException } from '@nestjs/common';
import {Repository} from "typeorm"
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto,UpdateProductDto} from './dto/';
import { Product } from './entities/product.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
import { resourceUsage } from 'process';


@Injectable()
export class ProductsService {

constructor(
private CategoriesServices:CategoriesService,
@InjectRepository(Product)
private productRepository: Repository<Product>,
){}

 async create(createProductDto: CreateProductDto) {
  const category=await this.CategoriesServices.findOneCategory(createProductDto.categoriesId)
  if(!category)throw new BadRequestException("category dont exist")
  const product=this.productRepository.create(createProductDto)
  return this.productRepository.save(product)
  }

  findAll() {
    return this.productRepository.find({relations:["categories"],select:["id","name","description","stock","price"]})
  }

 async findOne(id: number) {
       const product=await this.productRepository.findOne({where:{id},relations:["categories"],select:["id","name","description","stock","price"]})
       if(!product) throw new BadRequestException("product dont exist")
       return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product=await this.productRepository.findOne({where:{id}})
    if(!product)throw new BadRequestException("product dont exist")
   this.productRepository.update(id,updateProductDto)
    return {message:`the product ${id} has been updated`}
  }

  async remove(id: number) {
    const product=await this.productRepository.findOne({where:{id}})
    if(!product)throw new BadRequestException("product dont exist")
    this.productRepository.delete({id})
    return {message:`the product ${id} has been eliminated`}
  }
}
