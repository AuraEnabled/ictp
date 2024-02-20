import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto/createUser.dto';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UserResponseInterface } from '../auth/types/userResponse.interface';
import { LoginUserDto } from '../auth/dto/loginUser.dto';
import { compare } from 'bcrypt';
import { Roles } from '../enums/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  public async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  public async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const errorResponse = {
      errors: {},
    };

    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    const isValidRole = Object.values(Roles).includes(
      createUserDto.role as Roles,
    );

    if (!isValidRole) {
      errorResponse.errors['role'] = 'does not exist';
    }

    if (userByEmail) {
      errorResponse.errors['email'] = 'is taken';
    }

    if (
      (createUserDto.role === Roles.ADMINISTRATOR ||
        createUserDto.role === Roles.BOSS) &&
      createUserDto.bossId
    ) {
      errorResponse.errors['bossId'] = 'is not relevant to administrator/boss';
    } else if (
      createUserDto.role === Roles.REGULAR_USER &&
      !createUserDto.bossId
    ) {
      errorResponse.errors['bossId'] = 'is required for regular user';
    }

    if (
      createUserDto.bossId &&
      !(await this.isBossIdValid(createUserDto.bossId))
    ) {
      errorResponse.errors['bossId'] = 'is not a valid boss';
    }

    if (Object.entries(errorResponse.errors).length > 0) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  public async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'firstname', 'lastname', 'email', 'password'],
    });

    if (!userByEmail) {
      throw new HttpException(
        'User does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordMatch = await compare(
      loginUserDto.password,
      userByEmail.password,
    );

    if (!isPasswordMatch) {
      throw new HttpException(
        'Password is incorrect',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return userByEmail;
  }

  public async getUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['subordinates'],
    });
  }

  public async isBossIdValid(id: number): Promise<boolean> {
    const guessBoss = await this.getUserById(id);
    return guessBoss?.role === Roles.BOSS;
  }

  private generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      this.configService.get('JWT_SECRET'),
    );
  }

  public buildUserResponse(user: UserEntity): UserResponseInterface {
    delete user.password;
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
