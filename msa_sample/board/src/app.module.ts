import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board/entity/board.entity';

@Module({
  imports: [BoardModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'host.docker.internal',
    port: 3306,
    username: 'root',
    password: 'passwd', // 중요 내용은 .env파일에서 관리해야함
    database: 'testtest',
    entities: [Board], //엔티티 생성시 주입해야함
    synchronize: false, //false로 관리})
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
