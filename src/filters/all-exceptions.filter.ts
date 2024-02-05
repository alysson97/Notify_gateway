import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { ArgumentsHost, Catch } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    let error = { message: 'Internal server error', code: 500 };

    if (exception instanceof WsException) {
      error = exception.getError() as any;
    } else if (exception instanceof Error) {
      error = { message: exception.message, code: 400 };
    }

    client.emit('exception', error);
  }
}
