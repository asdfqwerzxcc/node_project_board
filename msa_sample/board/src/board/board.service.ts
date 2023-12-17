import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { MoreThan, Repository } from 'typeorm';
import { findByindex } from './dto/board.dto';

@Injectable()
export class BoardService {
    constructor(@InjectRepository(Board) private BoardRepository: Repository<Board>) { }

    async create_board(BoardDetail: Board) {
        const newBoard = this.BoardRepository.create({
            ...BoardDetail
        });
        return this.BoardRepository.save(newBoard);
    }

    async delete_board(BoardDetail: Board) {
        const deleteBoard = await this.BoardRepository.delete(
            { index: BoardDetail.index }
        );
        if (deleteBoard) {
            return "success";
        }
        return "fail"

    }

    async getByIndex(BoardDetail: findByindex) {
        const board = await this.BoardRepository.findOne(
            { where: { index: BoardDetail.index } }
        );
        return board;
    }

    async getAll_board() {
        const All_board = await this.BoardRepository.find({
            order: {
                // 역순으로 데이터를 가져오기 위해 'id' 필드를 사용합니다. 다른 필드를 사용하려면 필드명을 변경하면 됩니다.
                index: 'DESC'
            }
        })

        return All_board;
    }

    async gethot_board() {

        const hot_board = await this.BoardRepository.find({
            where: {
                count: MoreThan(10)
            },
            order: {
                // 역순으로 데이터를 가져오기 위해 'id' 필드를 사용합니다. 다른 필드를 사용하려면 필드명을 변경하면 됩니다.
                index: 'DESC'
            },
        })
        return hot_board
    }
    async updateBoard(index: findByindex, Board: Board) {
        const index1 = Number(index.index);

        // const entity=await this.BoardRepository.update(index1,Board);
        // console.log(entity)
        await this.BoardRepository.update(index1, Board);
        return this.getByIndex(index);
        // let newEntity = {
        //   ...entity,
        //   ...Board
        // };
        // console.log(newEntity);
        // await this.BoardRepository.save(newEntity)

    }
    async getboard_page(page) {
        console.log(page)
        page = page.page
        let start, end

        start = page * 10 - 9
        end = page * 10
        const All_board = await this.BoardRepository.find({
            order: {
                // 역순으로 데이터를 가져오기 위해 'id' 필드를 사용합니다. 다른 필드를 사용하려면 필드명을 변경하면 됩니다.
                index: 'DESC'
            },
            skip: start - 1, // start 인덱스는 1부터 시작하므로 -1 해줍니다.
            take: end - start + 1, // 10~20번째 데이터를 가져오기 위해 개수를 계산합니다.
        })
        return All_board
    }

}
