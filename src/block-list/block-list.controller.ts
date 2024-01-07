import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { SessionDTO } from 'src/auth/auth.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionInfo } from 'src/auth/session-info.decarator';
import {
  BlockListDTO,
  BlockListItemCreateDTO,
  BlockListQueryDTO,
} from 'src/block-list/block-list.dto';

@Controller('block-list')
@UseGuards(AuthGuard)
export class BlockListController {
  @Get()
  @ApiOkResponse({
    type: BlockListDTO,
  })
  getList(
    @Query() query: BlockListQueryDTO,
    @SessionInfo() session: SessionDTO,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: BlockListDTO,
  })
  createBlockListItem(
    @Body() body: BlockListItemCreateDTO,
    @SessionInfo() session: SessionDTO,
  ) {}

  @Delete()
  @ApiOkResponse()
  removeBlockListItem(
    @Param(ParseIntPipe) id: number,
    @SessionInfo() session: SessionDTO,
  ) {}
}
