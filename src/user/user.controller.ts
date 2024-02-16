import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../entities/user.entity';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
