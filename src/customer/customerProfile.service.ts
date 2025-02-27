import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Base, CustomerProfileDto, Details, Params } from './dto/customerProfile.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerProfileI } from './abstractions/customer.profile.abstract';
import { EntityBuilder } from 'src/helpers/entityBuilder';
import { CURRENCY_TYPE } from '@prisma/client';

@Injectable()
export class CustomerProfileService implements CustomerProfileI {

  private readonly notificationService: any
  private readonly entityBuilder: EntityBuilder = new EntityBuilder();

  constructor(private readonly prisma: PrismaService) {}

  async getDashboard(): Promise<any> {}

  async getProfile(id: number): Promise<CustomerProfileDto> {

    try {
      await this.prisma.$connect()

      let candidate: Base = await this.prisma.customer.findFirst({
        where:{id}, 
        select: {id: true, email: true,name: true, avatar: true}
      });
      if(!candidate) throw new NotFoundException("Customer Not Found")

      let details: Details = await this.prisma.customerDetails.findFirst({
        where: {customer_id: id},
        select: {
          role: true, currency: true, two_step_type: true,
          registration_type: true, created_at: true, updated_at: true,
        }
      });

      let params: Params = await this.prisma.customerParams.findFirst({
        where: {customer_id: id},
        select: {
          is_banned: true, is_activated:true, is_kyc: true, 
          is_premium: true, is_chat_ban: true,
        }
      })

      return await this.entityBuilder.buildACustomerProfileDto(candidate, details, params)
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    } finally {
      await this.prisma.$disconnect()
    } 
  }

  async updateName(id: number,name: string): Promise<void> {
    try {
      await this.prisma.$connect()
      await this.prisma.customer.update({where: {id},data: {name}})


    } catch (err) {
      throw new InternalServerErrorException(err.message)
    } finally {
      await this.prisma.$disconnect()
    }
  }

  async updateAvatar(id: number,avatar: string): Promise<void> {
    try {
      await this.prisma.$connect()
      await this.prisma.customer.update({where: {id},data: {avatar}})

    } catch (err) {
      throw new InternalServerErrorException(err.message)
    } finally {
      await this.prisma.$disconnect()
    }
  }

  async updateCurrency(customer_id: number, currency: CURRENCY_TYPE): Promise<void> {
    try {
      await this.prisma.$connect()
      await this.prisma.customerDetails.update({
        where: { id: (await this.prisma.customerDetails.findFirst({
          where: {customer_id},
          select: {id: true}
        })).id 
        },
        data: {currency}
      })

    } catch (err) {
      throw new InternalServerErrorException(err.message)
    } finally {
      await this.prisma.$disconnect()
    }
  }

  async updatePremiumStatus(id: number, status: boolean): Promise<void> {
    try {
      await this.prisma.$connect()
      await this.prisma.customerParams.update({
        where: { id: (await this.prisma.customerParams.findFirst({
          where: {customer_id: id},
          select: {id: true}
        })).id 
        },
        data: {is_premium: status}
      })

    } catch (err) {
      throw new InternalServerErrorException(err.message)
    } finally {
      await this.prisma.$disconnect()
    }
  }


  // ########################################################################################################
  // ##################################### private methods area #############################################
  // ########################################################################################################


}
