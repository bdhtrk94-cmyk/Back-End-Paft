import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

/**
 * Creates a Winston logger instance for NestJS.
 * - Console transport with colorized output for development
 * - File transports for persistent error and combined logs
 * - No sensitive data (tokens, passwords, emails) should pass through this logger
 */
export function createWinstonLogger() {
  return WinstonModule.createLogger({
    transports: [
      // Console output (development)
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          nestWinstonModuleUtilities.format.nestLike('PAFT', {
            prettyPrint: true,
            colors: true,
          }),
        ),
      }),

      // Error log file
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
        maxsize: 5 * 1024 * 1024, // 5MB
        maxFiles: 5,
      }),

      // Combined log file (all levels)
      new winston.transports.File({
        filename: 'logs/combined.log',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
        maxsize: 10 * 1024 * 1024, // 10MB
        maxFiles: 5,
      }),
    ],
  });
}
