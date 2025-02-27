import { ChangePasswordDto } from "../dto/changePwd.dto";
import { CustomerSecurityDto } from "../dto/customer.security.dto";

export abstract class CustomerSecurityI {
  // getSecurity -> get 2fa params, account status, change pwd, etc
  abstract getSecurity(customer_id: number): Promise<CustomerSecurityDto> ;
  abstract forgotPassword(email: string): Promise<void> ;
  abstract changePassword(dto: ChangePasswordDto): Promise<void> ;
  abstract enable2FA(): Promise<void> ;
  abstract disable2FA(): Promise<void> ;
  
}