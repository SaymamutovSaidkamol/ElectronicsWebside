import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  from_userId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  to_userId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  productId: number;

  @IsOptional()
  time?: Date = new Date();

  @ApiProperty({ example: 'Salom Qalaysiz' })
  @IsString()
  message: string;
}
