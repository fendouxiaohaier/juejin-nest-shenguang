import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @description 自定义获取查询参数
 */
export const MyQuery = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    console.log('MyQuery');
    const request: Request = ctx.switchToHttp().getRequest();
    return (request as any).query[key];
  },
);
