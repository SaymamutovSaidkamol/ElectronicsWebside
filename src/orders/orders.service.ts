import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateOrderDto, req: Request) {
    data.productId = Number(data.productId);

    data.userId = req['user'].id;

    let checkProd = await this.prisma.banner.findFirst({
      where: { id: data.productId },
    });

    if (!checkProd) {
      throw new BadRequestException('Product Not Found');
    }
    let newOrder = await this.prisma.order.create({ data });

    return { message: 'Order Success added', data: newOrder };
  }

  async findAll(req: Request) {
    let allOrder = await this.prisma.order.findMany({
      include: {
        user: { select: { id: true, fullName: true, role: true } },
        banner: {
          select: {
            id: true,
            name: true,
            price: true,
            status: true,
            count: true,
          },
        },
      },
      where: {userId: req['user'].id}
    });

    console.log(allOrder);
    

    if (allOrder.length === 0) {
      throw new NotFoundException('Order Not Found');
    }

    return { data: allOrder };
  }

  async findOne(id: number, req: Request) {
    id = Number(id);

    let checkOrder = await this.prisma.order.findFirst({
      where: { id },
      include: {
        user: { select: { id: true, fullName: true, role: true } },
        banner: {
          select: {
            id: true,
            name: true,
            price: true,
            status: true,
            count: true,
          },
        },
      },
    });

    if (!checkOrder) {
      throw new BadRequestException('order Not Found');
    }

    if (req['user'].id !== checkOrder.userId) {
      throw new BadRequestException('Your rights are limited.');
    }

    return { data: checkOrder };
  }

  async remove(id: number, req: Request) {
    
    id = Number(id);
    let checkOrder = await this.prisma.order.findFirst({
      where: { id },
    });
    
    if (!checkOrder) {
      throw new BadRequestException('order Not Found');
    }
    if (req['user'].id !== checkOrder.userId && req['user'].role !== "ADMIN") {
      throw new BadRequestException('Your rights are limited.');
    }
    
    let delOrder = await this.prisma.order.delete({
      where: { id },
    });
    return { message: 'order Success deleted', data: delOrder };
  }
}
