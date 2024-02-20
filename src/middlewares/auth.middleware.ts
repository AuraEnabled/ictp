import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { EnhancedRequestInterface } from '../types/enhancedRequest.interface';
import { verify } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: EnhancedRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.headers.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split('Bearer ')[1];

    try {
      const decode = verify(token, this.configService.get('JWT_SECRET'));
      req.user = await this.userService.getUserById(decode.id);
      next();
    } catch (err) {
      req.user = null;
      next();
    }

    return;
  }
}
