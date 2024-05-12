import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ReqUser } from './auth.types.js';

export const ParseReqUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): ReqUser => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { user } = request;
    if (!user) {
      throw new Error('User not found on request object');
    }
    return ReqUser.parse(user);
  },
);
