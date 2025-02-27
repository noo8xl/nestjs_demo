import { DOCUMENT_TYPE } from '@prisma/client'
import { 
	IsDate, IsDefined, IsEmail, 
	IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsPositive, IsString, ValidateIf
} from 'class-validator'

export class CustomerKyc {

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	firstName: string

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	lastName: string

	@IsDefined()
	@ValidateIf((object, value) => value !== null)
	@IsString()
	secondName: string

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	@IsPhoneNumber()
	phoneNumber: string

	// @IsDate()
	@IsDefined()
	@IsNotEmpty()
	birthDate: Date

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	street: string

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	houseNumber: string

	@IsDefined()
	@ValidateIf((object, value) => value !== null)
	@IsString()
	roomNumber: string

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	countryName: string

	@IsDefined()
	@ValidateIf((object, value) => value !== null)
	@IsString()
	province: string | null

	@IsDefined()
	@ValidateIf((object, value) => value !== null)
	@IsString()
	state: string | null

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	zipCode: string

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	city: string

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	documentNumber: string

	@IsDefined()
	@IsNotEmpty()
	@IsEnum(DOCUMENT_TYPE)
	documentType: DOCUMENT_TYPE
}