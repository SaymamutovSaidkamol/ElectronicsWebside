import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateBannerDto {
  @ApiProperty({ example: true })
  @IsString()
  status?: boolean;
}
