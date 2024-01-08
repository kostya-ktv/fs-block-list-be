import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsIn, IsOptional, IsString } from 'class-validator';

const BlockItemType = [
  $Enums.BlockItemType.KeyWord,
  $Enums.BlockItemType.Website,
];
export class BlockListItemDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  blockListId: number;

  @ApiProperty({
    type: BlockItemType,
  })
  type: $Enums.BlockItemType;

  @ApiProperty()
  data: string;

  @ApiProperty({
    type: Date,
  })
  createdAt: Date;
}

export class BlockListDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  ownerId: number;
  @ApiProperty({
    type: [BlockListItemDTO],
  })
  items: BlockListItemDTO[];
}

export class BlockListQueryDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  q?: string;
}
export class BlockListItemCreateDTO {
  @ApiProperty({
    type: BlockItemType,
  })
  @IsIn(BlockItemType)
  type: $Enums.BlockItemType;

  @ApiProperty()
  @IsString()
  data: string;
}
