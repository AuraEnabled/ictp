import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../entities/user.entity';
import { UserResponseInterface } from '../auth/types/userResponse.interface';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Get('users/all')
  async findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }
}
