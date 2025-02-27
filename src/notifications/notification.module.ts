import { Module } from "@nestjs/common";
import {NotificationService} from "./notification.service"
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [],
  providers: [NotificationService],
  imports: [ConfigModule],
  exports: [NotificationService]
})
export class NotificationModule {}
