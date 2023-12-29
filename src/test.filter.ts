import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * @description 这个TestFilter专门处理BadRequestException类型的一场
 */
@Catch(BadRequestException)
export class TestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    console.log('捕获异常-TestFilter-exception:', exception.getResponse());
    const response: Response = host.switchToHttp().getResponse();

    response.status(500).json({
      statusCode: 500,
      message: 'test-test: ' + exception.message,
    });
  }
}
