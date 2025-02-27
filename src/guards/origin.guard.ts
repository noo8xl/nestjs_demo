
// import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common'
// import { Observable } from 'rxjs';
// import { InjectModel } from '@nestjs/mongoose'
// import { Model } from 'mongoose'
// import { DomainListDocument } from '../models/domainList.model'
// import { DOMAIN_BASE } from '../interfaces/domainBase.interface'
// import { Reflector } from '@nestjs/core'

// @Injectable()
// export class OriginGuard {

// 	constructor(
// 		@InjectModel('DomainList') public domainList: Model<DomainListDocument>
// 	) {}

// 	async canActivate(
// 		data: string
// 	): Promise<boolean> {

// 		// const request = context.switchToHttp().getRequest();
// 		const dmn: string = data.split('//')[1]
// 		const availableDomain: DOMAIN_BASE = await this.domainList.
// 			findOne({ fullDomainName: dmn }).
// 			lean().
// 			exec()
// 		console.log('availableDomain => ', availableDomain);
// 		if (!availableDomain) throw new NotFoundException('wrong origin data')
// 		return true
// 	}
// }