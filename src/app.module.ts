import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { MailModule } from './mail/mail.module';
import { CategoryModule } from './category/category.module';
import { BannerModule } from './banner/banner.module';
import { OrdersModule } from './orders/orders.module';
import { ViewsModule } from './views/views.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    UploadModule,
    MailModule,
    UsersModule,
    CategoryModule,
    BannerModule,
    OrdersModule,
    ViewsModule,
    LikesModule,
    CommentsModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
