import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from '../guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ConfigModule],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
