import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { createWinstonLogger } from './common/logger.config';

async function bootstrap() {
  // Use Winston as the application logger
  const logger = createWinstonLogger();

  const app = await NestFactory.create(AppModule, { logger });

  // ── Security: Helmet HTTP headers ──────────────────────
  app.use(helmet());

  // ── Security: CORS configuration ───────────────────────
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global API prefix
  app.setGlobalPrefix('api');

  // Enable validation pipes globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`🚀 PAFT CMS API is running on: http://localhost:${port}/api`);
}
bootstrap();
