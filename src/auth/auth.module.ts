import { Module } from '@nestjs/common'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './strategy';
import { CustomerSecurityService } from '../customer/customerSecurity.service';
import { CustomerModule } from '../customer/customer.module';
import { NotificationService } from '../notifications/notification.service';
import { NotificationModule } from '../notifications/notification.module';

@Module({
  controllers: [AuthController],
	providers: [
    AuthService, CustomerSecurityService, JwtStrategy, 
    JwtService, NotificationService
  ], 
  imports: [
		PrismaModule,
    CustomerModule,
    NotificationModule,
    ConfigModule,
    JwtModule.register({}),
  ],
})
export class AuthModule {}
