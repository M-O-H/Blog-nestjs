import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  // Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from '../interface/role.interface';

// @Injectable()
export class CheckUserRole implements CanActivate {
  constructor(private readonly targetRoles: Role[]) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requset = context.switchToHttp().getRequest();
    const user = requset?.user;
    if (!this.targetRoles.includes(user.role))
      throw new ConflictException('PERMISSION_DENIED');
    return requset;
  }
}
