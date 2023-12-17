import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'subboard_info' })
export class subBoard {

    @PrimaryGeneratedColumn()
    index: number;

    @Column()
    comment: string;

    @Column()
    userIndex: number;

    @Column()
    boardIndex: number;

    @Column({ default: 0, nullable: false })
    direct: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    UpdatedAt: Date;
}