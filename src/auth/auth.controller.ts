import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @UsePipes(new ValidationPipe())
  async signUp(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    return await this.authService.signUpUser(createUserDto);
  }

  @Post('signIn')
  @UsePipes(new ValidationPipe())
  async signIn(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    return this.authService.signInUser(loginUserDto);
  }
}
