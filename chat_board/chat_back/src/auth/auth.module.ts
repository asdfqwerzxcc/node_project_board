import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
// import { JwtAccessStrategy } from './access.strategy';
// import { JwtRefrshStrategy } from './refresh.strategy';

@Module({
  imports:[UserModule,JwtModule.register({})],
  controllers: [AuthController,],
  providers: [AuthService,]
})
export class AuthModule {}
