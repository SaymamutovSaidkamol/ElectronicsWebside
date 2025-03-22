import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/Enums/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Request } from 'express';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(AuthGuard)
  @Post() 
  create(@Body() createLikeDto: CreateLikeDto, @Req() req: Request) {
    return this.likesService.create(createLikeDto, req);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.likesService.findAll();
  }
}
