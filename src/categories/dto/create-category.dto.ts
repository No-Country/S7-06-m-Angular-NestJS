import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name (unique)',
    nullable: false,
    minLength: 1,
    default: 'esferos',
  })
  @IsString()
  name: string;
}
