import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupRedisAdapter } from './redis/redis-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    const redisAdapter = await setupRedisAdapter();
    const server = app.getHttpServer();
    const io = server.get('_io');
    if (io) {
      io.adapter(redisAdapter);
      console.log('Redis adapter initialized');
    }
  } catch (error) {
    console.warn('Redis adapter not available, using in-memory adapter');
  }

  await app.listen(3000);
  console.log('Application is running on http://localhost:3000');
}

bootstrap();
