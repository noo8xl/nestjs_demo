import { IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordDto {

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
  
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}