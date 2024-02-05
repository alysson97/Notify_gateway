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
import { UseFilters } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AllExceptionsFilter } from '../filters/all-exceptions.filter';

@WebSocketGateway({
  namespace: '/notifications',
  cors: { origin: '*' },
})
@UseFilters(AllExceptionsFilter)
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('send-notification')
  handleSendNotification(client: Socket, data: { message: string }) {
    const user = (client as any).user;
    this.server.emit('notification', {
      message: data.message,
      sender: user?.username,
    });
    return { response: 'Notification sent' };
  }

  @SubscribeMessage('broadcast')
  handleBroadcast(client: Socket, data: { message: string }) {
    const user = (client as any).user;
    this.server.emit('broadcast', { ...data, sender: user?.username });
    return { status: 'Broadcasted' };
  }
}
