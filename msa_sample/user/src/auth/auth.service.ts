import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }
    //access토큰 생성
    getAccessToken({ user }): String {
        return this.jwtService.sign(
            {
                id: user.id,
                name: user.name,
                index: user.index
            },
            {
                secret: "123",
                expiresIn: '5m',
            }
        );
    }
    //refresh 토큰 생성 및 쿠키 전달
    setRefreshToken({ user, res }) {
        const refreshToken = this.jwtService.sign({
            id: user.id,
        },
            {
                secret: "123",
                expiresIn: '2w',
            });
        console.log("refresh");
        console.log(refreshToken);

        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
        return;
    }
}
