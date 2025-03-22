import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  productId: number;

  @ApiProperty({ example: 123 })
  @IsNumber()
  count: number;

  @IsOptional()
  orderDate?: Date = new Date();
}
