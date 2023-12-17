import { Controller, Post, Get, Param, Body, UnauthorizedException, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { signin } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService,
        private readonly authservice: AuthService) { }


    //로그인 및 토큰생성 전달
    @Post('/signin')
    async signin(@Body() authDTO: signin, @Res() res: Response) {
        const { id, passwd } = authDTO;
        //중복아이디
        const user = await this.userService.getById({ id: id });
        if (!user) {
            throw new UnauthorizedException('아이디 또는 비밀번호를 확인해 주세요.');
        }
        //비밀번호 확인 (bcrypt 복호화 과정 포함)
        const isSamePassword = bcrypt.compareSync(passwd, user.passwd);
        if (!isSamePassword) {
            throw new UnauthorizedException('아이디 또는 비밀번호를 확인해 주세요.');
        }
        //토큰생성
        this.authservice.setRefreshToken({ user, res });
        // console.log(refresh);
        const jwt = this.authservice.getAccessToken({ user });
        console.log(jwt)
        return res.status(200).send(jwt);
    }

    // @UseGuards(AuthGuard('access'))
    // @Get(':id')
    // selectProduct(@Param('id') id:string){
    //     return this.userService.getById({id:id});
    // }

}
