import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      return null;
    }

    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
