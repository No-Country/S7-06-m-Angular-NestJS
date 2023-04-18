import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    if (!createCategoryDto)
      throw new BadRequestException('please check your props');
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOneCategory(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new BadRequestException('id category dont exist');
    return category;
  }

  async findOneByName(name: string) {
    const category = await this.categoryRepository.findOneBy({ name });
    if (!category) throw new BadRequestException('id category dont exist');
    return category;
  }

  remove(id: string) {
    const category = this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new BadRequestException('id dont exist');
    this.categoryRepository.delete({ id });
    return { message: `category ${id} has deleted` };
  }
}
