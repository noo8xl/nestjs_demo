import { AuthGuard } from '@nestjs/passport'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {ConfigService} from "@nestjs/config";
import { AUTH_ENTITY_TYPE } from 'src/types/auth.entity.type';

 @Injectable()
 export class JwtAuthGuard extends AuthGuard("jwt") implements CanActivate {

  private readonly jwtSecret: string = this.configService.get('JWT_SECRET')

   constructor(
     private readonly configService: ConfigService,
     private jwtService: JwtService
    ) { 
      super();
    }

   async canActivate(context: ExecutionContext): Promise<boolean> {
     const request = context.switchToHttp().getRequest();
     const token: string = this.extractTokenFromHeader(request);
     if (!token) throw new UnauthorizedException();

     try {
       const payload: AUTH_ENTITY_TYPE = await this.jwtService.verifyAsync(token,{secret: this.jwtSecret});
      //  console.log('JwtAuthGuard token payload is -> ', payload)
       if (!payload) throw new NotFoundException();
       request["customer"] = payload;
       return true;
     } catch (e) {
       throw new InternalServerErrorException(e.message);
     }
   }

   private extractTokenFromHeader(request: Request): string | undefined {
     const [type, token] = request.headers.authorization?.split(' ') ?? [];
     return type === 'Bearer' ? token : undefined;
   }
 }