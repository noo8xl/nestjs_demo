
import { 
  IsDefined,
  IsEmail, IsNotEmpty, IsString, MaxLength, 
  MinLength, ValidateIf 
} from 'class-validator'

// signup request dto 
export class SignUpRequestDto  {
  
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password cannot be less than 8 characters!'})
  @MaxLength(30, { message: 'Password cannot be longer than 30 characters!'})
  password: string

  @IsString()
  @ValidateIf((obj, value) => value !== null)
  name: string

  @IsString()
  @ValidateIf((obj, value) => value !== null)
  referalLink: string

}