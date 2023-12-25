import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @description 自定义参数装饰器
 */
export const Ccc = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    return 'ccc';
  },
);
