import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @description 自定义获取头部字段装饰器
 */
export const CccHeader = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return key ? request.headers[key.toLowerCase()] : request.headers;
  },
);
