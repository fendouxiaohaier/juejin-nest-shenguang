import { applyDecorators, Get } from '@nestjs/common';
import { AaaDecorator } from 'src/aaa-decorator.decorator';

/**@description 合并多个装饰器
 *
 * @param path
 * @param role
 * @returns
 */
export function applyDecoratorsBbb(path, role) {
  return applyDecorators(Get(path), AaaDecorator(role));
}
