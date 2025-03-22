import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateLikeDto, req: Request) {
    data.userId = req['user'].id

    let checkProd = await this.prisma.banner.findFirst({
      where: { id: data.productId },
    });

    if (!checkProd) {
      throw new BadRequestException('Product Not Found');
    }

    let checkLike = await this.prisma.likes.findFirst({
      where: { userId: data.userId, productId: data.productId },
    });

    if (checkLike) {
      return {
        message: 'Like success deleted',
        data: await this.prisma.likes.delete({ where: { id: checkLike.id } }),
      };
    }

    let newLike = await this.prisma.likes.create({ data });

    return { message: 'You clicked like', data: newLike };
  }

  async findAll() {
    return {
      data: await this.prisma.likes.findMany({
        include: {
          user: {
            select: { id: true, fullName: true },
          },
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              status: true,
              count: true,
            },
          },
        },
      }),
    };
  }
}
