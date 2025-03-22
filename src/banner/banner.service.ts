import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BannerService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateBannerDto) {
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
    let allCateg = await this.prisma.banner.findMany({where: {approved_by_admin: true}});

    if (allCateg.length === 0) {
      throw new NotFoundException('banner Not Found');
    }

    return { data: allCateg };
  }

  async findOne(id: number) {
    id = Number(id);
    let checkCateg = await this.prisma.banner.findFirst({
      where: { id, approved_by_admin: true },
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

  async remove(id: number) {
    id = Number(id);
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

  query(data: any) {
    let { price, name, status, page, limit, sortBy, order, ...filters } = data;

    page = page || 1;
    limit = limit || 10;
    sortBy = sortBy || 'name';
    order = order || 'asc';

    const query: any = { where: { ...filters } };

    if (name) {
      query.where.name = name;
    }

    if (price) {
      price = Number(price);
      query.where.price = price;
    }

    if (status) {
      query.where.status = status;
    }

    console.log(typeof price);

    const skip = (page - 1) * limit;

    return this.prisma.banner.findMany({
      ...query,
      orderBy: {
        [sortBy]: order === 'asc' ? 'asc' : 'desc',
      },
      skip: skip,
      take: parseInt(limit, 10),
    });
  }
}
