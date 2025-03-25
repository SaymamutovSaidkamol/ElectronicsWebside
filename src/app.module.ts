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
import { ChatGateway } from './socket/socket.gateway';
import { ChatModule } from './socket/socket.module';

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
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
