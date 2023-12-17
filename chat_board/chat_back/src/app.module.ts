import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { Board } from './board/entity/board.entity';
import { SubboardModule } from './subboard/subboard.module';
import { subBoard } from './subboard/entity/subboard.entity';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'passwd', // 중요 내용은 .env파일에서 관리해야함
      database: 'testtest',
      entities: [User, Board, subBoard], //엔티티 생성시 주입해야함
      synchronize: false, //false로 관리})
    }),
    JwtModule.register({
      secret: "123"
    }),
    AuthModule,
    BoardModule,
    SubboardModule,

  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
