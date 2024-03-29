import winston = require('winston');

console.log(winston);

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      dirname: 'log',
      filename: 'test.log',
    }),
  ],
});
