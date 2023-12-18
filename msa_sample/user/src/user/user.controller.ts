import { Body, Controller, Post, Get, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { findByid } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private UserService: UserService) { }
    //회원가입
    @Post('create')
    async create(@Body() User: User) {
        console.log("create data:")
        console.log(User)
        //아이디 중복확인
        const hasID = await this.UserService.getById({ id: User.id })
        if (hasID) {
            throw new ConflictException('아이디 사용중')
            // return {message: "아이디 사용중"}
        }
        //생성
        this.UserService.createUser(User)
        return 'success';
    }

    @Post('delete')
    async delete(@Body() id: findByid) {
        return this.UserService.deleteUser(id);
    }

    @Post()
    async getById(@Body() id: findByid) {
        return this.UserService.getById(id);
    }
    @Get('all')
    async getByAll() {
        return this.UserService.getAlluser();
    }

}
