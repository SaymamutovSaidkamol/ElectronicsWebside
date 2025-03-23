import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  productId: number;

  @ApiProperty({ example: 'Salom' })
  @IsString()
  comment: string;

  @IsOptional()
  createAt?: Date = new Date();
}
