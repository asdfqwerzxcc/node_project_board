import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'host.docker.internal',
    port: 3306,
    username: 'root',
    password: 'passwd', // 중요 내용은 .env파일에서 관리해야함
    database: 'testtest',
    entities: [User], //엔티티 생성시 주입해야함
    synchronize: false, //false로 관리})
  }),
    JwtModule.register({
      secret: "123"
    }),
    AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }