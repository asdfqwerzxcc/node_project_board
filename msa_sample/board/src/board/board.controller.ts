import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './entity/board.entity';

@Controller('board')
export class BoardController {
    constructor(private BoardService: BoardService) { }

    @Post('create')
    async create(@Body() Board: Board) {
        return this.BoardService.create_board(Board);
    }
    @Post('delete')
    async delete(@Body() Board: Board) {
        return this.BoardService.delete_board(Board);
    }
    @Get('all')
    async getAll() {
        return (await this.BoardService.getAll_board()).length;
    }
    @Get('hot')
    async getHot() {
        return this.BoardService.gethot_board();
    }
    @Get(':index')
    async getById(@Param() index) {
        console.log("getbyId: ", index)
        return this.BoardService.getByIndex(index);
    }
    @Post('update/:index')
    async update(@Body() Board: Board, @Param() index) {
        return this.BoardService.updateBoard(index, Board);
    }
    @Get('boardlist/:page')
    async pageboard(@Param() page) {
        // console.log(start)
        // console.log(end)
        console.log(page)
        return this.BoardService.getboard_page(page);
    }



}
