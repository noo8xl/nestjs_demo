import { CustomerKYC } from "@prisma/client";
import { IsDefined, IsNotEmptyObject, ValidateNested } from "class-validator";

// modify db types to send only needed data to the client
export type KYCdata = Omit<CustomerKYC, "id" | "created_at" | "updated_at" | "customer_id" | "documents_id">

// dto for customer kyc details request
export class CustomerKycDto {

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  private kycDetails: KYCdata


  constructor(){}

  async setKycData(dto: KYCdata) {
    this.kycDetails = dto
  }

  async getEntity() {
    return this.kycDetails;
  }
}