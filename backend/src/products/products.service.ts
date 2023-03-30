import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

import { Product } from './entities/product.entity';

import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';

import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    private categoriesServices: CategoriesService,

    private dataSource: DataSource,
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

  async findAll(paginationDto: PaginationDto) {
    const { limit = 5, offset = 0 } = paginationDto;
    return await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: { categories: true },
    });
  }

  async findOne(term: string) {
    let product: Product | Product[];

    if (isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder
        .where('categories.name =:categories', {
          categories: term.toLowerCase(),
        })
        .leftJoinAndSelect('prod.categories', 'categories')
        .getMany();
    }

    if (!product) throw new NotFoundException(`Product with ${term} not found`);

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { categorie_name, ...productDetail } = updateProductDto;

    const category = await this.categoriesServices.findOneByName(
      categorie_name,
    );

    const product = await this.productRepository.preload({
      id,
      ...productDetail,
    });

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      if (categorie_name) {
        await queryRunner.manager.delete(Product, { categories: { id } });
        product.categories = category;
      }

      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return product;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.handleDBError(error);
    }
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not found`);

    await this.productRepository.remove(product);
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
