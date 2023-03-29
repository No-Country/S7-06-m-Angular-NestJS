import { Injectable,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {

constructor(
  @InjectRepository(Category) private categoryRepositorie:Repository<Category>

){}  
 async create(createCategoryDto: CreateCategoryDto) {
    if(!createCategoryDto)throw new BadRequestException("please check your props")
   const category=this.categoryRepositorie.create(createCategoryDto)
   return await this.categoryRepositorie.save(category)
  }

  async findAll() {
    return await this.categoryRepositorie.find();
  }

  async findOneCategory(id:string){
  const category=await this.categoryRepositorie.findOne({where:{id}})
  if(!category)throw new BadRequestException("id category dont exist")
  return category
  }

  remove(id: string) {
    const category=this.categoryRepositorie.findOne({where:{id}})
    if(!category)throw new BadRequestException("id dont exist")
     this.categoryRepositorie.delete({id});
     return {message:`category ${id} has deleted`}
  }
}
