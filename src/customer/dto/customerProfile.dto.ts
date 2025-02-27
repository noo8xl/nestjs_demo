import { 
  Customer, CustomerDetails, CustomerParams 
} from "@prisma/client";
import { 
  IsDefined, IsNotEmpty, IsNotEmptyObject, 
  IsObject, ValidateNested 
} from "class-validator";

// modify db types to send only needed data to the client
export type Base = Omit<Customer, "password">
export type Details = Omit<CustomerDetails, "id" | "customer_id" | "activation_link">
export type Params = Omit<CustomerParams, "id" | "customer_id" | "customer">

// dto for customer profile
export class CustomerProfileDto {

  @IsDefined()  
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  private base: Base

  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  private details: Details

  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  private params: Params


  constructor(){}

  async setBase(base: Base){
    this.base = base;
  }

  async setDetails(details: Details){
    this.details = details;
  }

  async setParams(params: Params){
    this.params = params;
  }

  // get entity for response
  async getEntity(): Promise<CustomerProfileDto> {
    return this;
  }
}