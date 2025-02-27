import {
	Controller, Get,
	HttpCode, Param
} from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
		private readonly appService: AppService
	) {}


	// // get footer page for user by page name & domain name  --------------------------------------<
	// @HttpCode(200)
	// @Get('/footer/:pageName/')
	// async getPageByName(
	// 	@Param('pageName') pageName: string,
	// 	@Param('domainName') domainName: string): Promise<string> {
	// 	return await this.appService.getFooterPageByName(pageName, domainName)
	// }


}
