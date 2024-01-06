import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CookieService } from 'src/auth/cookie.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest() as Request & {
      session: any;
    };
    const token = req.cookies[CookieService.tokenKey];

    if (!token) {
      throw new UnauthorizedException();
    }

    this.jwtService
      .verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })
      .then((sessionInfo) => {
        req['session'] = sessionInfo;
      })
      .catch(() => {
        throw new UnauthorizedException();
      });

    return true;
  }
}
