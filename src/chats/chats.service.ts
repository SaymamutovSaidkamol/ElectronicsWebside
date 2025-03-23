import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateChatDto, req: Request) {
    data.from_userId = req['user'].id
    let checkUser = await this.prisma.users.findFirst({
      where: { id: data.to_userId },
    });

    if (!checkUser) {
      throw new BadRequestException('Recipient User not found');
    }

    let checkProd = await this.prisma.banner.findFirst({
      where: { id: data.productId },
    });

    if (!checkProd) {
      throw new BadRequestException('Product Not Found');
    }

    return {
      message: 'Message sent successfully to User',
      data: await this.prisma.chats.create({ data }),
    };
  }

  async findAll() {
    return {
      data: await this.prisma.chats.findMany({
        include: {
          toUser: {
            select: { id: true, fullName: true },
          },
          fromUser: { select: { id: true, fullName: true } },
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

  async update(id: number, data: UpdateChatDto, req: Request) {
    id = Number(id)
    let checkChats = await this.prisma.chats.findFirst({
      where: { id },
    });

    if (!checkChats) {
      throw new BadRequestException('Chats User not found');
    }

    if (req['user'].id !== checkChats.from_userId && req['user'].role !== "ADMIN" && req['user'].role !== "SUPERADMIN") {
      throw new BadRequestException("Your rights are limited.")
    }

    let checkUser = await this.prisma.users.findFirst({
      where: { id: data.to_userId },
    });

    if (!checkUser) {
      throw new BadRequestException('Recipient User not found');
    }

    return {
      message: 'Chats successfully changed',
      data: await this.prisma.chats.updateMany({ data, where: { id } }),
    };
  }

  async remove(id: number, req: Request) {
    id = Number(id)
    let checkChats = await this.prisma.chats.findFirst({
      where: { id },
    });

    if (!checkChats) {
      throw new BadRequestException('Chats User not found');
    }

    if (req['user'].id !== checkChats.from_userId && req['user'].role !== "ADMIN") {
      throw new BadRequestException("Your rights are limited.")
    }

    return {
      message: 'Chats successfully deleted',
      data: await this.prisma.chats.delete({ where: { id } }),
    };
  }
}
