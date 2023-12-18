import { Module } from '@nestjs/common';
import { SubboardController } from './subboard.controller';
import { SubboardService } from './subboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { subBoard } from './entity/subboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([subBoard])],
  controllers: [SubboardController],
  providers: [SubboardService]
})
export class SubboardModule { }
