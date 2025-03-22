import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import * as path from 'path';
import * as fs from 'fs';

const deleteOldImage = (imgPath) => {
  if (imgPath) {
    const fullPath = path.join('uploads', imgPath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
};

@Injectable()
export class BannerService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateBannerDto, req: Request) {
    data.userId = req['user'].id;
    if (data.approved_by_admin) {
      throw new BadRequestException("Sorry, you can't create this.");
    }

    let checkCateg = await this.prisma.category.findFirst({
      where: { id: data.categoryId },
    });

    if (!checkCateg) {
      throw new BadRequestException('Category Not Found');
    }

    let newBanner = await this.prisma.banner.create({ data });

    return { message: 'banner Success added', data: newBanner };
  }

  async findAll() {
    let allCateg = await this.prisma.banner.findMany({
      where: { approved_by_admin: true },
      include: {
        category: { select: { id: true, name: true, type: true } },
        comment: {
          select: {
            id: true,
            comment: true,
            user: { select: { fullName: true } },
          },
        },
        chats: {
          select: {
            id: true,
            message: true,
            fromUser: { select: { fullName: true } },
          },
        },
        _count: { select: { view: true, likes: true } },
      },
    });

    if (allCateg.length === 0) {
      throw new NotFoundException('banner Not Found');
    }

    return { data: allCateg };
  }

  async findOne(id: number) {
    id = Number(id);
    let checkCateg = await this.prisma.banner.findFirst({
      where: { id, approved_by_admin: true },
      include: {
        category: { select: { id: true, name: true, type: true } },
        comment: {
          select: {
            id: true,
            comment: true,
            user: { select: { fullName: true } },
          },
        },
        chats: {
          select: {
            id: true,
            message: true,
            fromUser: { select: { fullName: true } },
          },
        },
        _count: { select: { view: true, likes: true } },
      },
    });

    if (!checkCateg) {
      throw new BadRequestException('banner Not Found');
    }

    return { data: checkCateg };
  }

  async update(id: number, data: UpdateBannerDto) {
    id = Number(id);

    if (data.status) {
      let updateBanner = await this.prisma.banner.updateMany({
        where: { id },
        data: { approved_by_admin: true },
      });

      return { message: 'Banner Activate' };
    }

    throw new BadRequestException('Sorry !!!');
  }

  async remove(id: number, req: Request) {
    id = Number(id);

    if (req['user'].role !== 'ADMIN' && id !== req['user'].id) {
      throw new BadRequestException('Your rights are limited.');
    }

    let checkCateg = await this.prisma.banner.findFirst({
      where: { id },
    });

    if (!checkCateg) {
      throw new BadRequestException('banner Not Found');
    }
    
    let delCateg = await this.prisma.banner.delete({
      where: { id },
    });
    return { message: 'banner Success deleted', data: delCateg };
  }

  async query(data: any) {
    let { price, name, status, page, limit, sortBy, order, ...filters } = data;

    page = page || 1;
    limit = limit || 10;
    sortBy = sortBy || 'name';
    order = order || 'asc';

    const skip = (page - 1) * limit;

    const banners = await this.prisma.banner.findMany({
      where: { ...filters },
      select: {
        id: true,
        name: true,
        price: true,
        status: true,
        comment: true,
        chats: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
      skip: skip,
      take: parseInt(limit, 10),
    });

    if (sortBy === 'likes') {
      return banners.sort((a, b) => {
        const aCount = a._count[sortBy] || 0;
        const bCount = b._count[sortBy] || 0;
        return order === 'asc' ? aCount - bCount : bCount - aCount;
      });
    }

    return banners;
  }
}
