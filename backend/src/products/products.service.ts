import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/';
import { Product } from './entities/product.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoriesServices: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { categorie_name, ...productDetails } = createProductDto;
      const category = await this.categoriesServices.findOneByName(
        categorie_name,
      );

      const product = this.productRepository.create({
        ...productDetails,
        categories: category,
      });

      await this.productRepository.save(product);

      return { product };
    } catch (error) {
      this.handleDBError(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.productRepository.find({
      relations: ['categories'],
      select: ['id', 'name', 'description', 'stock', 'price'],
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categories'],
      select: ['id', 'name', 'description', 'stock', 'price'],
    });
    if (!product) throw new BadRequestException('product dont exist');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new BadRequestException('product dont exist');
    this.productRepository.update(id, updateProductDto);
    return { message: `the product ${id} has been updated` };
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new BadRequestException('product dont exist');
    this.productRepository.delete({ id });
    return { message: `the product ${id} has been eliminated` };
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check your logs');
  }
}
