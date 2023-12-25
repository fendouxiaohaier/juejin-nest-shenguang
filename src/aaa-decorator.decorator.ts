import { SetMetadata } from '@nestjs/common';

// handle装饰器
export const AaaDecorator = (...args: string[]) =>
  SetMetadata('aaa-decorator', args);
