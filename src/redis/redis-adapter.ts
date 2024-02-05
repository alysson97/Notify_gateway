// @ts-ignore
import { createAdapter } from 'socket.io-redis';
import { createClient } from 'redis';

export async function setupRedisAdapter() {
  const pubClient = createClient({
    socket: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    },
  });

  const subClient = pubClient.duplicate();

  await pubClient.connect();
  await subClient.connect();

  return createAdapter(pubClient, subClient);
}
