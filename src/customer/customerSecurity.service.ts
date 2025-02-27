import { ForbiddenException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { passwordGenerator } from "../helpers/passwordGenerator";
import { PrismaService } from "../prisma/prisma.service";
import { CustomerSecurityDto } from "./dto/customer.security.dto";
import { ChangePasswordDto } from "./dto/changePwd.dto";
import { NotificationService } from "../notifications/notification.service";
import { NOTIFICATION_API_BODY_TYPE } from "src/types/notification.dto.type";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { AUTH_ENTITY_TYPE } from "src/types/auth.entity.type";



@Injectable()
export class CustomerSecurityService {

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService
  ) {}

  async getSecurity(customer_id: number): Promise<CustomerSecurityDto> {

    try {
      await this.prisma.$connect();

      let ref = await this.prisma.referalLink.findFirst({where: {customer_id}, select: {link: true, used_times: true}})
      let twoStep = await this.prisma.customerTwoStep.findFirst({
        where: {customer_id}, 
        select: {type: true, telegram_id: true, enable_at: true, updated_at: true}
      })


      let response: CustomerSecurityDto = {
        referalLink: ref.link || null,
        usedTimes: ref.used_times,
        twoStepData: {
          type: twoStep.type,
          telegram_id: twoStep.telegram_id,
          enable_at: twoStep.enable_at,
          updated_at: twoStep.updated_at,
        },
      }

      await this.cacheManager.set(customer_id.toString(), response)
      return response

    } catch (err) {
      throw new InternalServerErrorException(err.message)
    } finally {
      await this.prisma.$disconnect()
    }

  }

  async forgotPassword(email: string): Promise<void> {

    try {
      await this.prisma.$connect();

      const candidateId: number = (await this.prisma.customer.findFirst({where: {email}, select: {id: true}})).id
      if (!candidateId) throw new NotFoundException("Customer not found")
  
      const updatedPassword: string = await passwordGenerator(12)
      await this.prisma.customer.update({where: {id: candidateId}, data: {password: updatedPassword}})

      let pld: NOTIFICATION_API_BODY_TYPE = {
        serviceType: "email",
        domainName: "auth_demo",
        content: `Your new password is: ${updatedPassword}.`,
        recipient: email,
      }
      await this.notificationService.sendCustomerMessage(pld)

    } catch (err) {
      throw new InternalServerErrorException(err.message)
    } finally {
      await this.prisma.$disconnect()
    }
  }
  

  async changePassword(dto: ChangePasswordDto): Promise<void> {

    try {
      await this.prisma.$connect()

      const candidate: {id: number, password: string} = await this.prisma.customer.findFirst({
        where: {email: dto.email}, 
        select: {id: true, password: true}
      })
      if (!candidate) throw new NotFoundException("Customer not found")
  
      if (dto.oldPassword !== candidate.password) throw new ForbiddenException("Old password is incorrect")
      await this.prisma.customer.update({where: {id: candidate.id}, data: {password: dto.newPassword}})
      await this.prisma.customerDetails.update({
        where: {
          id: (await this.prisma.customerDetails.findFirst({
          where: {customer_id: candidate.id},
          select: {id: true}
        })).id
        }, 
        data: {updated_at: new Date()}
      })

    } catch (err) {
      // rollback changes if error
      throw new InternalServerErrorException("change pwd got an error: ", err.message)
    } finally {
      await this.prisma.$disconnect()
    }
  }

  async enable2FA(): Promise<void> {
    try {
      // do some *
      await this.update2FAstatus(true)
    } catch (err) {
      throw new InternalServerErrorException("enable 2fa got an err: ", err.message)
    }
  }

  async disable2FA(): Promise<void> {
    try {
      // do some *
      await this.update2FAstatus(false)
    } catch (err) {
      throw new InternalServerErrorException("disable 2fa got an err: ", err.message)
    }
  }

  // ########################################################################################################
  // ##################################### private methods area #############################################
  // ########################################################################################################


  // update2FAstatus -> update status only *
  private async update2FAstatus(status: boolean): Promise<void> {}


}