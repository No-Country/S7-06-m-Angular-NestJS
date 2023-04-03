import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  createdAt: string;

  @IsOptional()
  @IsString()
  paidAt?: string;

  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;

  @IsNumber()
  taxPrice: number;

  @IsNumber()
  totalPrice: number;
}
