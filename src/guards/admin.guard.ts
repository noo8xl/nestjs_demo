import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AUTH_ENTITY_TYPE } from '../types/auth.entity.type';
import { ROLE } from '@prisma/client';


// middleware for protect admin end points
export class OnlyAdminGuard implements CanActivate{

  constructor(){}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{customer: AUTH_ENTITY_TYPE}>()
    const customer = request.customer
    if(customer.role !== ROLE.ADMIN) throw new ForbiddenException()
    return true
  }

}