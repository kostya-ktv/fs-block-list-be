import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class AccountDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  @IsBoolean()
  isBlockingEnabled: boolean;
}

export class AccountPatchDTO {
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isBlockingEnabled: boolean;
}
