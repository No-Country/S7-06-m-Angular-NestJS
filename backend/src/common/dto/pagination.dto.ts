import { IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}
