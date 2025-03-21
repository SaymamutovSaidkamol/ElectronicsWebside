import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCategoryDto) {
    let checkCateg = await this.prisma.category.findFirst({
      where: { name: data.name },
    });

    if (checkCateg) {
      throw new BadRequestException('This Category alredy exist');
    }

    let newCateg = await this.prisma.category.create({ data });

    return { message: 'Category Success added', data: newCateg };
  }

  async findAll() {
    let allCateg = await this.prisma.category.findMany();

    if (allCateg.length === 0) {
      throw new NotFoundException('Category Not Found');
    }

    return { data: allCateg };
  }

  async findOne(id: number) {
    let checkCateg = await this.prisma.category.findFirst({
      where: { id },
    });

    if (checkCateg) {
      throw new BadRequestException('Category Not Found');
    }

    return { data: checkCateg };
  }

  async update(id: number, data: UpdateCategoryDto) {
    let checkCateg = await this.prisma.category.findFirst({
      where: { id},
    });

    if (checkCateg) {
      throw new BadRequestException('Category Not Found');
    }

    let updateCateg = await this.prisma.category.updateMany({
      where: {
        id,
      },
      data,
    });

    return { message: 'Category Success has been changed', data: updateCateg };
  }

  async remove(id: number) {
    let checkCateg = await this.prisma.category.findFirst({
      where: { id},
    });

    if (checkCateg) {
      throw new BadRequestException('Category Not Found');
    }

    let delCateg = await this.prisma.category.delete({
      where: { id},
    });
    return { message: 'Category Success deleted', data: delCateg };
  }
}
