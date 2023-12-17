import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'board_info' })
export class Board {
    @PrimaryGeneratedColumn()
    index: number;

    @Column()
    userIndex: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ default: 0, nullable: false, type: 'integer' })
    count: number;

    @Column({ default: 0, nullable: false, type: 'integer' })
    view: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    UpdatedAt: Date;
}