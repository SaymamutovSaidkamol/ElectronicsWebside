import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ViewsService } from './views.service';
import { CreateViewDto } from './dto/create-view.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/Enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: CreateViewDto, @Req() req: Request) {
    return this.viewsService.create(data, req);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.viewsService.findAll();
  }

}
