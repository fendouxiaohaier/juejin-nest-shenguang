import { LoggerService } from '@nestjs/common';
import * as chalk from 'chalk';
import * as dayjs from 'dayjs';
import { createLogger, format, Logger, transports } from 'winston';

/**
 * const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};
 */
export class WinstonLogger implements LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'debug',
      transports: [
        new transports.Console({
          format: format.combine(
            format.json(),
            format.colorize(),
            format.printf(({ context, level, message, time }) => {
              const appStr = chalk.green(`[NEST]`);
              const contextStr = chalk.yellow(`[${context}]`);

              return `${appStr} ${time} ${level} ${contextStr} ${message} `;
            }),
          ),
        }),
        new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          filename: 'winston.log',
          dirname: 'log',
        }),
      ],
    });
  }

  log(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('info', message, { context, time });
  }

  error(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('error', message, { context, time });
  }

  warn(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('warn', message, { context, time });
  }

  debug(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    this.logger.log('debug', message, { context, time });
  }
}
