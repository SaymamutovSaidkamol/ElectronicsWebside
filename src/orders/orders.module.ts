import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ChatGateway } from 'src/socket/socket.gateway';
import { ChatModule } from 'src/socket/socket.module';

@Module({
  imports: [ChatModule],
  controllers: [OrdersController],
  providers: [OrdersService],

})
export class OrdersModule {}
