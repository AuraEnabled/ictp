import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../entities/user.entity';
import { UserResponseInterface } from '../auth/types/userResponse.interface';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { UserType } from '../auth/types/user.type';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Get('user/details')
  @UseGuards(AuthGuard)
  async currentUserWithLowerOnes(
    @User() user: UserEntity,
  ): Promise<UserType[]> {
    return await this.userService.getUserWithSubordinates(user);
  }

  @Put('user/change-boss')
  @UseGuards(AuthGuard)
  async updateUserBoss(
    @User() currentUser: UserEntity,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserType> {
    return await this.userService.updateBossId(currentUser, updateUserDto);
  }
}
