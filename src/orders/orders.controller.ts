import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { Role } from 'src/Enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    return this.ordersService.create(createOrderDto, req);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    return this.ordersService.findAll(req);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number, @Req() req: Request) {
    return this.ordersService.findOne(id, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: Request) {
    return this.ordersService.remove(id, req);
  }
}
