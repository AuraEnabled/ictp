import { UserEntity } from '../entities/user.entity';
import { Request } from 'express';

export interface EnhancedRequestInterface extends Request {
  user?: UserEntity;
}
