import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
@Entity({name: 'user_info'})
export class User{
    @PrimaryGeneratedColumn()
    index : number;

    @Column()
    name: string;

    @Column({unique:true})
    id : string;

    @Column()
    passwd: string;
    //주입 전 암호화 과정
    @BeforeInsert()
    private beforeInsert() {
      this.passwd = bcrypt.hashSync(this.passwd, 10);
    }
}