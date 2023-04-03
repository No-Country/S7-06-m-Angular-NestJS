import { Response } from 'express';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v2 as cloudinary } from 'cloudinary';

import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helper';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticProductImage(imageName);

    res.send(path);
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        filename: fileNamer,
      }),
    }),
  )
  async uploadProductImage(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    // Configuration
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });

    if (!file)
      throw new BadRequestException('Make sure that the file is an image');

    const photoUrl = await cloudinary.uploader.upload(`${file.path}`, {
      public_id: `${file.filename}`,
    });

    const secureUrl = `${photoUrl.secure_url}`;

    return { secureUrl };
  }
}
