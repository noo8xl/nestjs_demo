import { PrismaService } from "../prisma/prisma.service";
import { CustomerKycI } from "./abstractions/customer.kyc.abstract";
import { CustomerKycDto, KYCdata } from "./dto/customer.kyc.response.dto";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CustomerKyc } from "./dto/сustomer.kyc.request.dto";
import { EntityBuilder } from "src/helpers/entityBuilder";
import * as fs from "node:fs/promises"


@Injectable()
export class CustomerKYCService implements CustomerKycI {

  private readonly builder: EntityBuilder = new EntityBuilder();
  private documentPath: string = `${process.env.DOCUMENTS_PATH}/customerId_`;

  constructor(private readonly prisma: PrismaService) {}

  async setKYC(customer_id: number, dto: CustomerKyc, files: Array<Express.Multer.File>): Promise<void> {
    try {
      await this.prisma.$connect()

      let documentsId: number = await this.handleFiles(customer_id, files);
      let data = {
        first_name: dto.firstName,
        last_name: dto.lastName,
        second_name: dto.secondName,
        birth_date: new Date(dto.birthDate),
        phone_number: dto.phoneNumber,
        country: dto.countryName,
        province: dto.province,
        zip_code: dto.zipCode,
        street: dto.street,
        state: dto.state,
        house_number: dto.houseNumber,
        room_number: dto.roomNumber,
        document_type: dto.documentType,
        documents_id: documentsId,
        customer_id: customer_id 
      }

      let kyc = await this.prisma.customerKYC.create({data})
      let params = await this.prisma.customerParams.update({
        where: {id: (await this.prisma.customerParams.findFirst({
          where: {customer_id: customer_id},
          select: {id: true}
        })).id
      },
        data: {is_kyc: true}
      })

      Promise.all([kyc,params])

    } catch (err: any) {
      throw new InternalServerErrorException("Got an error at set kyc: ", err.message)
    } finally{
      await this.prisma.$disconnect()
    }
  }

  async handleFiles(id: number, files: Array<Express.Multer.File>): Promise<number> {
    let p = this.documentPath + id.toString();
    try {
      return (await this.prisma.kycDocuments.create({data: {file_path: p, customer_id: id} })).id
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }
  
  async getKYC(id: number): Promise<KYCdata> {

    try {
      await this.prisma.$connect()


      let kyc: KYCdata = await this.prisma.customerKYC.findFirst({
        where: {customer_id: id},
        select: {
          first_name: true,
          second_name: true,
          last_name: true,
          birth_date: true,
          phone_number: true,

          country: true,
          province: true,
          zip_code: true,

          street: true,
          state: true,
          room_number: true,
          house_number: true,

          document_type: true,
          status: true,
        }
      })

      return kyc
      // return this.builder.buildACustomerKycDto(kyc)

    } catch (err: any) {
      throw new InternalServerErrorException("Got an error at delete kyc: ", err.message)
    } finally{
      await this.prisma.$disconnect()
    }
  }

  async getDocuments(customerId: number): Promise<string[]> {

    let arr = []
    let p = this.documentPath + customerId.toString()

    let files = await fs.readdir(p)
    files.forEach(f => {
      arr.push(p+f)
    })

    return arr
  }

  async deleteKYC(id: number): Promise<void> {
    try {
      await this.prisma.$connect()

      let kyc = await this.prisma.customerKYC.delete({
        where: {
          id: (await this.prisma.customerKYC.findFirst({
            where: {customer_id: id},
            select: {id: true}
          })).id
        }})

      let doc = await this.prisma.kycDocuments.delete({
        where: {id: kyc.documents_id
        }})

      let params = await this.prisma.customerParams.update({
        where: {
          id: (await this.prisma.customerParams.findFirst({
            where: {customer_id: id},
            select: {id: true}
          })).id
        },
        data: {is_kyc: false}
      })

      let files = await fs.rm(doc.file_path, { recursive: true, force: true })

      Promise.all([kyc,doc,files,params])

    } catch (err: any) {
      throw new InternalServerErrorException("Got an error at delete kyc: ", err.message)
    } finally{
      await this.prisma.$disconnect()
    }
  }

}