import { TWO_STEP_TYPE } from '@prisma/client'
import { 
	IsBoolean, IsDefined, IsEmail, IsEnum, 
	IsNotEmpty, IsNumber
 } from 'class-validator'

export class Update2FAStatus {

	@IsDefined()
	@IsNotEmpty()
	@IsNumber()
	id: Number

	@IsDefined()
	@IsNotEmpty()
	@IsEnum(TWO_STEP_TYPE)
	twoFaType: TWO_STEP_TYPE

	@IsDefined()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsNotEmpty()
	@IsBoolean()
	twoFaStatus: boolean

}
