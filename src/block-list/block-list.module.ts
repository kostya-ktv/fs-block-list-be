import { Module } from '@nestjs/common';
import { BlockListController } from './block-list.controller';
import { BlockListService } from './block-list.service';

@Module({
  controllers: [BlockListController],
  providers: [BlockListService]
})
export class BlockListModule {}
