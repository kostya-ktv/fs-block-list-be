import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import {
  SessionDTO,
  SignInPayloadDTO,
  SignUpPayloadDTO,
} from 'src/auth/auth.dto';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { CookieService } from 'src/auth/cookie.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionInfo } from 'src/auth/session-info.decarator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private cookieService: CookieService,
  ) {}

  @Post('sign-up')
  @ApiCreatedResponse()
  async signUp(
    @Body() body: SignUpPayloadDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.signUp(body);
    this.cookieService.setToken(response, accessToken);
  }

  @Post('sign-in')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() body: SignInPayloadDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.signIn(body);
    this.cookieService.setToken(response, accessToken);
  }

  @Post('sign-out')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  signOut(@Res() res: Response) {
    this.cookieService.removeToken(res);
  }

  @Get('session')
  @ApiOkResponse({
    type: SessionDTO,
  })
  @UseGuards(AuthGuard)
  getSession(@SessionInfo() session: SessionDTO) {
    return session;
  }
}
