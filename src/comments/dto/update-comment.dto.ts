import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ example: 'Salom' })
  @IsString()
  comment?: string;

  @IsOptional()
  createAt?: Date = new Date();
}
