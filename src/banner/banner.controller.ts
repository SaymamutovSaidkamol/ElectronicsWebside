import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { BannerStatus } from 'src/Enums/role.enum';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

    @Get('/query')
    @ApiOperation({
      summary: 'Hududlarni qidirish',
      description: 'Berilgan parametrlar bo‘yicha hududlarni qidirish',
    })
    @ApiResponse({ status: 200, description: 'Muvaffaqiyatli bajarildi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiQuery({ name: 'name', required: false, type: String })
    @ApiQuery({ name: 'price', required: false, type: Number })
    @ApiQuery({ name: 'status', required: false, type: String, enum: BannerStatus })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'sortBy', required: false, type: String, example: 'name' })
    @ApiQuery({
      name: 'order',
      required: false,
      type: String,
      enum: ['asc', 'desc'],
      example: 'asc',
    })
    query(@Query() data: any){
      return this.bannerService.query(data)
    }

  @Post()
  create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannerService.create(createBannerDto);
  }

  @Get()
  findAll() {
    return this.bannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bannerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(id, updateBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bannerService.remove(id);
  }
}
