import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { BlockListService } from 'src/block-list/block-list.service';
import { DbService } from 'src/db/db.service';
import { UserCreateDTO } from 'src/users/users.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly dbService: DbService,
    private readonly accountService: AccountService,
    private readonly blockListService: BlockListService,
  ) {}
  async findByEmail(email: string) {
    return await this.dbService.user.findFirst({
      where: { email },
    });
  }
  async createUser(payload: UserCreateDTO) {
    const { email, hash, salt } = payload;

    const user = await this.dbService.user.create({
      data: {
        email,
        hash,
        salt,
      },
    });
    if (user) {
      await this.accountService.createAccount(user.id);
      await this.blockListService.createBlockList(user.id);
    }
    return user;
  }
}
