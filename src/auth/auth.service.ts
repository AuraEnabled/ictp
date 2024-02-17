import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserEntity } from '../entities/user.entity';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUpUser(
    createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user: UserEntity = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  async signInUser(loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
    const user: UserEntity = await this.userService.loginUser(loginUserDto);
    return this.userService.buildUserResponse(user);
  }
}
