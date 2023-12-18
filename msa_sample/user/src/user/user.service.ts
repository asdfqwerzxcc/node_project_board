import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { findByid } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(userDetails: User) {
        const newUser = this.userRepository.create(userDetails);
        return this.userRepository.save(newUser);


    }

    async deleteUser(id: findByid) {
        const deleteuser = await this.userRepository.delete(id);
        // console.log(deleteuser)
        if (deleteuser.affected === 0) {
            return { message: "fail" };
        }
        return { message: "success" };
    }
    async getById(id: findByid) {
        const getById = await this.userRepository.findOne({ where: { id: id.id } });
        return getById;
    }
    async getAlluser() {
        return this.userRepository.find();
    }

}
