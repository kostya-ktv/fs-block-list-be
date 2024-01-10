import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetToken = createParamDecorator(
  <T extends string>(data: T, ctx: ExecutionContext): T | undefined => {
    const cookies = ctx.switchToHttp().getRequest()?.cookies;
    if (data in cookies) {
      return cookies[data];
    }
    return undefined;
  },
);
