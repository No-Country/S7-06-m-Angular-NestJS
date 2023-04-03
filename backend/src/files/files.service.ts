import { existsSync } from 'fs';
import { join } from 'path';
import { v2 as cloudinary } from 'cloudinary';

import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}

  getStaticProductImage(imageName: string) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });

    const url = cloudinary.url(`${imageName}`, {
      width: 300,
      height: 150,
      Crop: 'fill',
    });

    return url;
  }
}
