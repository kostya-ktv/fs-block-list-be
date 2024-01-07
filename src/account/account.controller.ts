import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AccountDTO, AccountPatchDTO } from 'src/account/account.dto';
import { AccountService } from 'src/account/account.service';
import { SessionDTO } from 'src/auth/auth.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionInfo } from 'src/auth/session-info.decarator';

@Controller('account')
@UseGuards(AuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Get()
  @ApiOkResponse({ type: AccountDTO })
  async getAccount(@SessionInfo() session: SessionDTO): Promise<AccountDTO> {
    return await this.accountService.getAccount(session.id);
  }

  @Patch()
  @ApiOkResponse({ type: AccountDTO })
  async patchAccount(
    @Body() body: AccountPatchDTO,
    @SessionInfo() session: SessionDTO,
  ): Promise<AccountDTO> {
    return await this.accountService.patchAccount(session.id, body);
  }
}
