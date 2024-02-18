import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { EnhancedRequestInterface } from '../types/enhancedRequest.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<EnhancedRequestInterface>();

    if (request.user) {
      return true;
    }
    throw new HttpException('User not authorized', HttpStatus.UNAUTHORIZED);
  }
}
