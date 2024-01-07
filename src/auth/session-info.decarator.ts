import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const SessionInfo = createParamDecorator(
  (data, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().session,
);
