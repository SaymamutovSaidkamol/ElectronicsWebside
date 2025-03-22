import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { BannerStatus } from 'src/Enums/role.enum';

export class CreateBannerDto {
  @ApiProperty({ example: 'Televizor' })
  @IsString()
  name: string;

  @ApiProperty({ example: 23000 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: "Zo'r Televizor" })
  @IsString()
  description: string;

  // @ApiProperty({ example: ['new', 'old'] })
  // @IsString()
  // status: BannerStatus;
  @ApiProperty({ example: ['new', 'old'] })
  @IsEnum(BannerStatus)
  status: BannerStatus;

  @ApiProperty({ example: 23 })
  @IsNumber()
  count: number;

  @IsString()
  approved_by_admin: boolean;

  @ApiProperty({ example: 1 })
  @IsNumber()
  categoryId: number;
}
