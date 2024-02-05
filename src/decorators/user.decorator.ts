import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const client = ctx.switchToWs().getClient();
    const user = client.user;

    return data ? user?.[data] : user;
  },
);
