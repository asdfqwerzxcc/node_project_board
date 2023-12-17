import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { SubboardService } from './subboard.service';
import { subBoard } from './entity/subboard.entity';

@Controller('subboard')
export class SubboardController {
    constructor(private subboardservice: SubboardService) { }

    @Post('create')
    async create(@Body() sub: subBoard) {
        this.subboardservice.create(sub);
        return 'success'
    }
    @Get('all/:index')
    async getAll(@Param() index) {
        console.log("subBoard_get_all_byindex", index)
        return await this.subboardservice.getallsub(index);
    }
}
