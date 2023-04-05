import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Category } from './entities/category.entity';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiResponse({
    status: 201,
    description: 'Category was create',
    type: Category,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (category already exists)',
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Categories',
    type: Category,
  })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Category was deleted',
    type: Category,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request (category doesn't found)",
  })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}
