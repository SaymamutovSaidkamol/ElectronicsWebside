import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCommentDto, req: Request) {
    data.userId = req['user'].id
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

    let newComment = await this.prisma.comment.create({ data });

    return { message: 'comment sent successfully', data: { newComment } };
  }

  async findAll() {
    return {
      data: await this.prisma.comment.findMany({
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

  async update(id: number, data: UpdateCommentDto, req: Request) {


    let checkUser = await this.prisma.comment.findFirst({
      where: { id },
    });

    if (!checkUser) {
      throw new NotFoundException('Comment Not Found');
    }

    if (checkUser.userId !== req['user'].id && req['user'].role !== "ADMIN" && req['user'].role !== "SUPERADMIN") {
      throw new BadRequestException("Your rights are limited.")
    }

    let updateComment = await this.prisma.comment.updateMany({
      data,
      where: { id },
    });
    return { message: 'comment successfully changed', data: updateComment };
  }

  async remove(id: number, req: Request) {

    let checkUser = await this.prisma.comment.findFirst({
      where: { id },
    });

    if (!checkUser) {
      throw new NotFoundException('Comment Not Found');
    }

    if (checkUser.userId !== req['user'].id && req['user'].role !== "ADMIN") {
      throw new BadRequestException("Your rights are limited.")
    }

    return {
      message: 'comment successfully deleted',
      data: await this.prisma.comment.delete({ where: { id } }),
    };
  }
}
