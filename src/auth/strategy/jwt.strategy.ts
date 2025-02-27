import {  Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Customer } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(
    readonly config: ConfigService,
    private prisma: PrismaService
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET')
      // ignoreExpiration: true,
    });
  }

  async validate(payload: any) {
    const candidate: Customer = await this.prisma.customer.findUnique({where:{id: payload.sub}})
    console.log('payload is -> ', payload)
    return candidate;
  }

}