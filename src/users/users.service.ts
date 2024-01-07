import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { DbService } from 'src/db/db.service';
import { UserCreateDTO } from 'src/users/users.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly dbService: DbService,
    private readonly accountService: AccountService,
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
    }
    return user;
  }
}
