import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountDTO, AccountPatchDTO } from 'src/account/account.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AccountService {
  constructor(private readonly dbService: DbService) {}

  async createAccount(userId: number) {
    return await this.dbService.account.create({
      data: {
        ownerId: userId,
        isBlockingEnabled: false,
      },
    });
  }
  async getAccount(userId: number): Promise<AccountDTO> {
    return await this.dbService.account.findFirstOrThrow({
      where: {
        ownerId: userId,
      },
    });
  }

  async patchAccount(
    userId: number,
    payload: AccountPatchDTO,
  ): Promise<AccountDTO> {
    return await this.dbService.account.update({
      where: {
        ownerId: userId,
      },
      data: { ...payload },
    });
  }
}
