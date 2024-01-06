import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpPayloadDTO, SignInPayloadDTO } from 'src/auth/auth.dto';
import { PasswordService } from 'src/auth/password.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}
  async signUp(body: SignUpPayloadDTO) {
    const user = await this.userService.findByEmail(body.email);
    if (user) {
      throw new BadRequestException({ type: 'User already exists' });
    }
    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(body.password, salt);
    const createdUser = await this.userService.createUser({
      email: body.email,
      hash,
      salt,
    });
    const accessToken = await this.jwtService.signAsync({
      id: createdUser.id,
      email: createdUser.email,
    });
    return { accessToken };
  }

  async signIn(body: SignInPayloadDTO) {
    const user = await this.userService.findByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const hash = this.passwordService.getHash(body.password, user.salt);
    if (hash !== user.hash) {
      throw new UnauthorizedException();
    }
    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });
    return { accessToken };
  }
}
