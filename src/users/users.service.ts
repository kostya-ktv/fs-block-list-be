import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { UserCreateDTO } from 'src/users/users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {}
  async findByEmail(email: string) {
    return await this.dbService.user.findFirst({
      where: { email },
    });
  }
  async createUser(payload: UserCreateDTO) {
    const { email, hash, salt } = payload;
    return await this.dbService.user.create({
      data: {
        email,
        hash,
        salt,
      },
    });
  }
}
