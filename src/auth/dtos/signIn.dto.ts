import {IsDefined, IsEmail, IsNotEmpty, IsString, ValidateIf} from 'class-validator'

// login request dto
export class SignInRequestDto {

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string 

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  name: string

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string

  @IsString()
  @ValidateIf((object, value) => value !== null)
  twoStepCode: string

}