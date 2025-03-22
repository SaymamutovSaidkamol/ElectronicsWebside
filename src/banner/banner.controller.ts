import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { BannerStatus, Role } from 'src/Enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Request } from 'express';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @UseGuards(AuthGuard)
  @Get('/query')
  @ApiOperation({
    summary: 'Hududlarni qidirish',
    description: 'Berilgan parametrlar bo‘yicha hududlarni qidirish',
  })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli bajarildi' })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'price', required: false, type: Number })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    enum: BannerStatus,
  })
  @ApiQuery({ name: 'like', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    enum: ['name', 'likes'],
    example: 'like',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    type: String,
    enum: ['asc', 'desc'],
    example: 'asc',
  })
  query(@Query() data: any) {
    return this.bannerService.query(data);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBannerDto: CreateBannerDto, @Req() req: Request) {
    return this.bannerService.create(createBannerDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.bannerService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bannerService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(id, updateBannerDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: Request) {
    return this.bannerService.remove(id, req);
  }
}
