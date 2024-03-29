import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { SessionDTO } from 'src/auth/auth.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionInfo } from 'src/auth/session-info.decarator';
import { GetToken } from 'src/auth/token.decorator';
import {
  BlockListDTO,
  BlockListItemCreateDTO,
  BlockListItemDTO,
  BlockListQueryDTO,
} from 'src/block-list/block-list.dto';
import { BlockListService } from 'src/block-list/block-list.service';

@Controller('block-list')
@UseGuards(AuthGuard)
export class BlockListController {
  constructor(private readonly blockListService: BlockListService) {}
  @Get()
  @ApiOkResponse({
    type: BlockListDTO,
  })
  async getBlockList(
    @Query() query: BlockListQueryDTO,
    @SessionInfo() session: SessionDTO,
  ): Promise<BlockListDTO> {
    return await this.blockListService.getBlockListByParams(session.id, query);
  }

  @Post()
  @ApiCreatedResponse({
    type: BlockListDTO,
  })
  async createBlockListItem(
    @Body() body: BlockListItemCreateDTO,
    @SessionInfo() session: SessionDTO,
    @GetToken('access-token') token: string,
  ): Promise<BlockListItemDTO> {
    return await this.blockListService.addItem(session.id, body);
  }

  @Delete()
  @ApiQuery({
    name: 'id',
    type: 'number',
  })
  @ApiOkResponse()
  async removeBlockListItem(
    @Query('id', ParseIntPipe) id: number,
    @SessionInfo() session: SessionDTO,
  ) {
    return await this.blockListService.removeItem(session.id, id);
  }
}
