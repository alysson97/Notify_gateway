import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

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

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('send-notification')
  handleSendNotification(
    @MessageBody() data: { message: string },
  ): { response: string } {
    this.server.emit('notification', { message: data.message });
    return { response: 'Notification sent' };
  }

  @SubscribeMessage('broadcast')
  handleBroadcast(
    @MessageBody() data: { message: string },
  ): { status: string } {
    this.server.emit('broadcast', data);
    return { status: 'Broadcasted' };
  }
}
