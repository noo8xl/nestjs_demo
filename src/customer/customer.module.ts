import { Module } from '@nestjs/common';
import { CustomerProfileService } from './customerProfile.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomerController } from './customer.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CustomerKYCService } from './customerKyc.service';
import { CustomerSecurityService } from './customerSecurity.service';
import { NotificationModule } from '../notifications/notification.module';

@Module({
  controllers: [CustomerController],
  providers: [
    CustomerProfileService, CustomerKYCService, CustomerSecurityService, 
    PrismaService, JwtService,
  ],
  imports: [PrismaModule, NotificationModule],
})
export class CustomerModule {}
