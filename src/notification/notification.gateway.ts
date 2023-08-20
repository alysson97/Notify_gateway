import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { W3cJwtGuard } from '../auth/w3c-jwt.guard';

@WebSocketGateway({
  namespace: '/notifications',
  cors: { origin: '*' },
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  @UseGuards(W3cJwtGuard)
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('send-notification')
  @UseGuards(W3cJwtGuard)
  handleSendNotification(
    @MessageBody() data: { message: string },
  ): { response: string } {
    this.server.emit('notification', { message: data.message });
    return { response: 'Notification sent' };
  }

  @SubscribeMessage('broadcast')
  @UseGuards(W3cJwtGuard)
  handleBroadcast(
    @MessageBody() data: { message: string },
  ): { status: string } {
    this.server.emit('broadcast', data);
    return { status: 'Broadcasted' };
  }
}
