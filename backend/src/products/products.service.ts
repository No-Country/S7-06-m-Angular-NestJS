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
import { v2 as cloudinary } from 'cloudinary';

import { Product } from './entities/product.entity';

import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';

import { CategoriesService } from '../categories/categories.service';
import { ProductImage } from './entities';
import { User } from '../auth/entities/auth.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,

    private categoriesServices: CategoriesService,

    private dataSource: DataSource,

    private readonly configService: ConfigService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    user: User,
    file: Express.Multer.File,
  ) {
    try {
      // Configuration cloudinary
      cloudinary.config({
        cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
        api_key: this.configService.get('CLOUDINARY_API_KEY'),
        api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
      });

      const photoUrl = await cloudinary.uploader.upload(`${file.path}`, {
        public_id: `${file.filename}`,
      });

      const secureUrl = `${photoUrl.secure_url}`;

      const {
        images = [secureUrl],
        category_name,
        price,
        ...productDetails
      } = createProductDto;

      const category = await this.categoriesServices.findOneByName(
        category_name.toLowerCase(),
      );

      const product = this.productRepository.create({
        ...productDetails,
        categories: category,
        price: Number(price),
        images: images.map((image) =>
          this.productImageRepository.create({ url: image }),
        ),
        user,
      });

      await this.productRepository.save(product);

      return { product };
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 20, offset = 0 } = paginationDto;

    return await this.productRepository.find({
      take: +limit,
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
        .leftJoinAndSelect('prod.images', 'images')
        .getMany();
    }

    if (!product) throw new NotFoundException(`Product with ${term} not found`);

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    user: User,
    file?: Express.Multer.File,
  ) {
    // Configuration cloudinary
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });

    // eslint-disable-next-line prefer-const
    let { images, category_name, price, ...productDetail } = updateProductDto;

    let secureUrl: any;

    if (file) {
      const photoUrl = await cloudinary.uploader.upload(`${file.path}`, {
        public_id: `${file.filename}`,
      });
      secureUrl = `${photoUrl.secure_url}`;
      images = [secureUrl];
    }

    const category = await this.categoriesServices.findOneByName(category_name);

    const product = await this.productRepository.preload({
      id,
      price: Number(price),
      ...productDetail,
    });

    if (!product)
      throw new NotFoundException(`Product with id: ${id} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      if (category_name) {
        await queryRunner.manager.delete(Product, { categories: { id } });
        product.categories = category;
      }

      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } });

        product.images = images.map((image) =>
          this.productImageRepository.create({ url: image }),
        );
      }

      product.user = user;

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
