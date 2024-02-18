import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
