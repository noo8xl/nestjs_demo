import { CURRENCY_TYPE } from "@prisma/client";
import { CustomerProfileDto } from "../dto/customerProfile.dto";
export abstract class CustomerProfileI {
  abstract getDashboard(): Promise<any>;
  abstract getProfile(id: number): Promise<CustomerProfileDto>;
  abstract updateName(id: number, name: string): Promise<void>;
  abstract updateAvatar(id: number, avatar: string): Promise<void>;
  abstract updateCurrency(customer_id: number, currency: CURRENCY_TYPE): Promise<void>;

  abstract updatePremiumStatus(id: number, status: boolean): Promise<void>;

}