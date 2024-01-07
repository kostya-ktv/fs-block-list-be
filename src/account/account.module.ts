import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, DbService],
  exports: [AccountService],
})
export class AccountModule {}
