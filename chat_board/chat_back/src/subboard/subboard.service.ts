import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { subBoard } from './entity/subboard.entity';

@Injectable()
export class SubboardService {
    constructor(@InjectRepository(subBoard) private SubBoardRepository: Repository<subBoard>) { }

    async create(subDetail: subBoard) {
        const newBoard = this.SubBoardRepository.create({
            ...subDetail
        });
        return this.SubBoardRepository.save(newBoard);
    }
    getOrderByClause(numberOfHyphens: number): string {
        const orderByClauses = [];
        for (let i = 1; i <= numberOfHyphens; i++) {
            orderByClauses.push(
                `CONVERT(SUBSTRING_INDEX(path, '-', ${i}), UNSIGNED) ASC`,
                `CTE.index ASC`
            );
        }
        return orderByClauses.join(', ');
    }
    async getallsub(board_index) {
        // console.log(board_index)
        const numberOfHyphens = 5; // Change this number as needed.

        const orderByClause = this.getOrderByClause(numberOfHyphens);

        const query = `
        WITH RECURSIVE CTE AS (
            SELECT \`index\`, userIndex, boardIndex, direct, comment, createdAt, UpdatedAt, convert(\`index\`, char(999)) as path
            FROM subboard_info
            WHERE direct = 0 AND boardIndex = ${board_index.index}
            UNION ALL
            SELECT uc.\`index\`, uc.userIndex, uc.boardIndex, uc.direct, uc.comment, uc.createdAt, uc.UpdatedAt, concat(CTE.path, '-', uc.\`index\`) AS path
            FROM subboard_info uc
            INNER JOIN CTE ON uc.direct = CTE.index
            WHERE uc.boardIndex = ${board_index.index}
        )
        SELECT CTE.\`index\`, userIndex, boardIndex, direct, comment, createdAt, UpdatedAt, path
        FROM CTE
        ORDER BY CONVERT(SUBSTRING_INDEX(path, '-', 1), UNSIGNED) ASC, CTE.path ASC, CONVERT(SUBSTRING_INDEX(path, '-', 2), UNSIGNED) ASC, CTE.path ASC, CONVERT(SUBSTRING_INDEX(path, '-', 3), UNSIGNED) ASC, CTE.path ASC;

      `;

        const results = await this.SubBoardRepository.query(query);
        return results;
    }
}
