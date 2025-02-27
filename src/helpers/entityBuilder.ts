import { InternalServerErrorException } from "@nestjs/common";
import { Base, CustomerProfileDto, Details, Params } from "../customer/dto/customerProfile.dto";
import { CustomerKycDto, KYCdata, } from "../customer/dto/customer.kyc.response.dto";

// EntityBuilder -> build an entity from recieved DTOs to use it as a response to the client API
export class EntityBuilder {

  constructor() {}

  async buildACustomerProfileDto(base: Base, details: Details, params: Params): Promise<CustomerProfileDto> {
    let c: CustomerProfileDto = new CustomerProfileDto()

    try {
      await c.setBase(base)
      await c.setDetails(details)
      await c.setParams(params)
      return c.getEntity()

    } catch (e: any) {
      throw new InternalServerErrorException("entity builder gor an error: ", e.message)
    }
  }

  async buildACustomerKycDto(dto: KYCdata): Promise<KYCdata> {
    let kyc: CustomerKycDto = new CustomerKycDto();

    try {
      await kyc.setKycData(dto)
      return kyc.getEntity()
      
    } catch (e: any) {
      throw new InternalServerErrorException("entity builder gor an error: ", e.message)
    }

  }
}