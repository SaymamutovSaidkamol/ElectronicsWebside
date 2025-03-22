import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateOrderDto) {
    data.userId = Number(data.userId);
    data.productId = Number(data.productId);

    let checkUser = await this.prisma.users.findFirst({
      where: { id: data.userId },
    });

    if (!checkUser) {
      throw new BadRequestException('User Not Found');
    }

    let checkProd = await this.prisma.banner.findFirst({
      where: { id: data.productId },
    });

    if (!checkProd) {
      throw new BadRequestException('Product Not Found');
    }
    let newOrder = await this.prisma.order.create({ data });

    return { message: 'Order Success added', data: newOrder };
  }

  async findAll() {
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
    });

    if (allOrder.length === 0) {
      throw new NotFoundException('Order Not Found');
    }

    return { data: allOrder };
  }

  async findOne(id: number) {
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

    return { data: checkOrder };
  }

  async remove(id: number) {
    id = Number(id);
    let checkOrder = await this.prisma.order.findFirst({
      where: { id },
    });

    if (!checkOrder) {
      throw new BadRequestException('order Not Found');
    }

    let delOrder = await this.prisma.order.delete({
      where: { id },
    });
    return { message: 'order Success deleted', data: delOrder };
  }
}
