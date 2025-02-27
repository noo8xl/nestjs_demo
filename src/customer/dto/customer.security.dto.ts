import { CustomerTwoStep } from "@prisma/client";
import { 
  IsDefined, IsNotEmpty, IsNotEmptyObject, 
  IsNumber, IsObject, IsString, ValidateNested 
} from "class-validator";

// modify db types to send only needed data to the client
type TwoFA = Omit<CustomerTwoStep, "id" | "secret_outpath" | "secret_base32" | "customer_id">

// dto for customer security request
export class CustomerSecurityDto {

  @IsDefined()  
  @IsNotEmpty()
  @IsString()
  referalLink: string

  @IsDefined()  
  @IsNotEmpty()
  @IsNumber()
  usedTimes: number

  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  twoStepData: TwoFA

}