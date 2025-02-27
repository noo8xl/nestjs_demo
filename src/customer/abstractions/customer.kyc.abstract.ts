import { KYCdata } from "../dto/customer.kyc.response.dto";
import { CustomerKyc } from "../dto/сustomer.kyc.request.dto";

export abstract class CustomerKycI {
  abstract setKYC(customer_id: number, dto: CustomerKyc, files: Array<Express.Multer.File>): Promise<void>;
  abstract handleFiles(customer_id: number, files: Array<Express.Multer.File>): Promise<number>; // returns a doc table ID
  abstract getKYC(customer_id: number): Promise<KYCdata>;
  abstract getDocuments(customerId: number): Promise<any>;
  abstract deleteKYC(customer_id: number): Promise<void>;
}