import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';

import { ProductsService } from './products.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

import { Auth } from '../auth/decorators';
import { Roles } from '../auth/interfaces';
import { Product } from './entities/product.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/auth.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helper';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({
    status: 201,
    description: 'Product was create',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (product already exists)',
  })
  @Auth(Roles.Admin)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        filename: fileNamer,
      }),
    }),
  )
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file)
      throw new BadRequestException('Make sure that the file is an image');

    return this.productsService.create(createProductDto, user, file);
  }

  @ApiResponse({
    status: 201,
    description: 'Found all products',
    type: Product,
  })
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Product was found',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request (product doesn't exists)",
  })
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOne(term);
  }

  @ApiResponse({
    status: 201,
    description: 'Product was updated',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request (product doesn't exists)",
  })
  @Auth(Roles.Admin)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @ApiResponse({
    status: 201,
    description: 'Product was deleted',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request (product doesn't exists)",
  })
  @Auth(Roles.Admin)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
