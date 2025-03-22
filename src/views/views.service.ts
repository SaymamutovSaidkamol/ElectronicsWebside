import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ViewsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateViewDto, req: Request) {
    data.userId = req['user'].id
    let checkView = await this.prisma.views.findFirst({
      where: { userId: data.userId, productId: data.productId },
    });

    let checkProduct = await this.prisma.banner.findFirst({
      where: { id: data.productId },
    });

    if (!checkProduct) {
      throw new NotFoundException('Product Not Found');
    }

    if (checkView) {
      throw new BadRequestException('You have already viewed this product.');
    }

    let newView = await this.prisma.views.create({ data });
    return { message: 'New view success added', data: newView };
  }

  async findAll() {
    return {
      data: await this.prisma.views.findMany({
        include: {
          user: { select: { id: true, fullName: true, role: true } },
          product: true,
        },
      }),
    };
  }
}
