import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { User } from 'src/auth/entities/auth.entity';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  paidAt?: string;

  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;

  @IsNumber()
  @IsOptional()
  taxPrice?: number;

  @IsNumber()
  @IsOptional()
  totalPrice?: number;
}
