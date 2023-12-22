import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (Number.isNaN(parseInt(value))) {
      // 抛出一个 BadRequestException 类型的异常 然后由TestFilter处理
      throw new BadRequestException(`参数${metadata.data}错误`);
    }

    console.log('打印日志看看-typeof value:', typeof value);
    return typeof value === 'number' ? value * 100 : parseInt(value) * 110;
  }
}
