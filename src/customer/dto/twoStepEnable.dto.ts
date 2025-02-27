import { IsBoolean, IsString } from 'class-validator'


export class TWO_STEP_ENABLE_DTO {

	@IsString()
	userId: string

	@IsString()
	twoFaType: string

	@IsBoolean()
	twoFaStatus: boolean

	@IsString()
	domainName: string

	@IsString()
	userEmail: string

	@IsString()
	currentTime: string

	@IsString()
	code: string

}