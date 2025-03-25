import { Module } from '@nestjs/common';
import { ChatGateway } from './socket.gateway';

@Module({
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
