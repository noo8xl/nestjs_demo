import {
	BadRequestException, ForbiddenException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';


import { Customer, CustomerDetails, CustomerParams, CustomerTwoStep, ReferalLink, ROLE, TWO_STEP_TYPE } from '@prisma/client';
import { passwordGenerator } from '../helpers/passwordGenerator';
import { ConfigService } from '@nestjs/config';
import { SignInRequestDto } from './dtos/signIn.dto';
import { SignUpRequestDto } from './dtos/signUp.dto';
import { AuthI } from './auth.abstract';
import { AUTH_ENTITY_TYPE } from 'src/types/auth.entity.type';
import { NotificationService } from 'src/notifications/notification.service';

@Injectable()
export class AuthService implements AuthI {

  private readonly jwtSecret: string = this.config.get("JWT_SECRET")

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly notificationService: NotificationService
  ){}

  async validate2faCode(code: string): Promise<void> {
    try {
      const codeId: number = (await this.prisma.twoStepCodeList.findFirst({where: {code}})).id
      if(!codeId) throw new NotFoundException('Received code not found')
      await this.prisma.twoStepCodeList.delete({where: {id: codeId}})

    } catch (err) {
      throw new InternalServerErrorException(err.message)
    } 
  }

  async signupLocal(dto: SignUpRequestDto): Promise<void> {

    type DATA = Omit<SignUpRequestDto, 'referalLink'>
    let customer: Customer;
    let refLink: ReferalLink;
    let details: CustomerDetails;
    let params: CustomerParams;
    let twoFA: CustomerTwoStep;

    let activationLink: string 
    let data: DATA = {email: dto.email, password: dto.password, name: dto.name}; 
    console.log('data', data)

    try {
      await this.prisma.$connect();

      let isCandidate = await this.prisma.customer.findUnique({where: {email: dto.email}, select: {id: true}})
      if(isCandidate !== null) throw new BadRequestException('Email already in use!');

      if (dto.referalLink !== null) {
        customer = await this.prisma.customer.create({data})
        refLink = await this.prisma.referalLink.create({
          data: {
            link: dto.referalLink, 
            used_times: (await this.prisma.referalLink.findFirst({
              where: {link: dto.referalLink}, 
              select: {used_times: true}}
            )).used_times +1, 
            customer_id: customer.id}})
      } else {
        customer = await this.prisma.customer.create({data})
        refLink = await this.prisma.referalLink.create({data: {link: "", used_times: 0, customer_id: customer.id}})
      }

      activationLink = await passwordGenerator(16)
      details = await this.prisma.customerDetails.create({data: {activation_link: activationLink, customer_id: customer.id}})
      params = await this.prisma.customerParams.create({data: {customer_id: customer.id}})
      twoFA = await this.prisma.customerTwoStep.create({data: {customer_id: customer.id}})

      Promise.all([customer,details,params,twoFA,refLink])

    } catch (err) {
      throw new InternalServerErrorException(err)
    } finally {
      await this.prisma.$disconnect()
    }
  }

  async activate(link: string): Promise<void> {

    let details: {id: number, customer_id: number};
    // let paramsId: number;

    try {
      await this.prisma.$connect();

      details = await this.prisma.customerDetails.findFirst({
        where: {activation_link: link}, 
        select: {customer_id: true, id: true}
      })
      if(!details) throw new NotFoundException();

      
      let params = await this.prisma.customerParams.update({
        where: {id: (await this.prisma.customerParams.findFirst({where: {customer_id: details.customer_id},select: {id: true}})).id},
        data: {is_activated: true}
      })
      let updatedDetails = await this.prisma.customerDetails.update({where: {id: details.id}, data: {updated_at: new Date()}})

      Promise.all([details, params, updatedDetails])

    } catch (err: any) {
      throw new InternalServerErrorException("Activate account by link got an error: ", err.message)
    } finally {
      await this.prisma.$disconnect()
    }
  }

  async login(dto: SignInRequestDto): Promise<string> {

    let customer: {id: number, email: string, password: string};
    let role: ROLE;
    let params: {is_banned: boolean, is_activated: boolean, is_premium: boolean};

    try {
      await this.prisma.$connect();

      dto.twoStepCode !== ""
        ? await this.checkTwoStepStatus(dto.email)
        : await this.validate2faCode(dto.twoStepCode);

      customer = await this.prisma.customer.findFirst({
        where: {email: dto.email}, 
        select: {id: true, email: true, password: true}
      })
      role = (await this.prisma.customerDetails.findFirst({
        where: {customer_id: customer.id}, 
        select: {role: true}}
      )).role
      params = await this.prisma.customerParams.findFirst({
        where: {customer_id: customer.id}, 
        select: {is_banned: true, is_activated: true, is_premium: true}
      })

      if(customer.password !== dto.password) throw new BadRequestException('Invalid password');
      if(!params.is_activated) throw new ForbiddenException("Check your email to activate account");


      Promise.all([customer,role,params])
      let tokenPayload: AUTH_ENTITY_TYPE = {
        customerId: customer.id,
        isBannned: params.is_banned,
        isPremium: params.is_premium,
        role: role,
      }

      return await this.issueTokenPair(tokenPayload)

    } catch (err) {
      throw new InternalServerErrorException(err.message)
    } finally {
      await this.prisma.$disconnect()
    }
  }

  async issueTokenPair(payload: AUTH_ENTITY_TYPE): Promise<string> {
    try {
      let token: string = await this.jwtService.signAsync(payload, {
        expiresIn: '6h',
        secret: this.jwtSecret
      })

      return token;
    } catch (err) {
      throw new InternalServerErrorException("generate token got an error: ", err.message)
    }
	}

  async checkTwoStepStatus(customerEmail: string): Promise<void> {
    try {    
      let customerId: number = (await this.prisma.customer.findFirst({where: {email: customerEmail}, select: {id: true}})).id
      let is2FA = await this.prisma.customerTwoStep.findFirst({
        where: { customer_id: customerId},
        select: { type: true, telegram_id: true }
      })

      if(is2FA.type === TWO_STEP_TYPE.OFF) return
      else {

      }

      let code2fa: string = await passwordGenerator(8)
      let stamp = new Date()
      stamp.setMinutes(stamp.getMinutes() + 5);
      await this.prisma.twoStepCodeList.create({data: {code: code2fa, email: customerEmail, expiredDate: stamp, customer_id: customerId}})

      switch(is2FA.type as TWO_STEP_TYPE) {
        case TWO_STEP_TYPE.EMAIL:
          await this.notificationService.sendCustomerMessage({
            serviceType: "email",
            domainName: "http://auth_demo/api/",
            content: code2fa,
            recipient: customerEmail
          })
          break;
        case TWO_STEP_TYPE.GOOGLE:
          // do some
          console.log("will available soon");
          break;
        case TWO_STEP_TYPE.TELEGRAM:
          await this.notificationService.sendCustomerMessage({
            serviceType: "telegram",
            domainName: "http://auth_demo/api/",
            content: code2fa,
            recipient: is2FA.telegram_id.toString()
          })
          break;
        default:
          break;
      }

      throw new ForbiddenException("2FA is enabled")

    } catch (err) {
      throw new InternalServerErrorException(err.message)
    } 
  }
 }
