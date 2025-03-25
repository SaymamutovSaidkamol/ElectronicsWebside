import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  private server: Server;

  private users = new Map();

  handleConnection(client: Socket) {
    console.log('Connected users --> ', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Disconnected users --> ', client.id);
  }

  @SubscribeMessage('register')
  register(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    let id = data.id;
    let socketId = client.id;
    this.users.set(id, socketId);
    // console.log(this.users);
  }

  @SubscribeMessage('private-habar')
  handlePricateMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    let clientId = data.userId;
    let socketId = this.users.get(clientId);

    this.server.to(socketId).emit('yangisi', { ...data, from: client.id });
    return 'hello world';
  }

  notifyUsers(event: string, data: any) {
    this.server.emit(event, data);
  }
}
