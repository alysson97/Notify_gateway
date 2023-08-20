import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [NotificationModule, AuthModule],
})
export class AppModule {}
