import { Injectable } from '@nestjs/common';
import {
  BlockListItemCreateDTO,
  BlockListQueryDTO,
} from 'src/block-list/block-list.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class BlockListService {
  constructor(private readonly dbService: DbService) {}

  private async getBlockListByUserID(userId: number) {
    return await this.dbService.blockList.findUniqueOrThrow({
      where: {
        ownerId: userId,
      },
    });
  }
  async createBlockList(userId: number) {
    return await this.dbService.blockList.create({
      data: {
        ownerId: userId,
      },
    });
  }
  async getBlockListByParams(userId: number, query: BlockListQueryDTO) {
    return await this.dbService.blockList.findFirstOrThrow({
      where: {
        ownerId: userId,
      },
      include: {
        items: {
          where: {
            data: {
              contains: query.q,
              mode: 'insensitive',
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async addItem(userId: number, data: BlockListItemCreateDTO) {
    const blockList = await this.getBlockListByUserID(userId);
    return await this.dbService.blockItem.create({
      data: {
        blockListId: blockList.id,
        data: data.data,
        type: data.type,
      },
    });
  }

  async removeItem(userId: number, itemId: number) {
    const blockList = await this.getBlockListByUserID(userId);
    return await this.dbService.blockItem.delete({
      where: {
        blockListId: blockList.id,
        id: itemId,
      },
    });
  }
}
