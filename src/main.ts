import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { createWinstonLogger } from './common/logger.config';

async function bootstrap() {
  // Use Winston as the application logger
  const logger = createWinstonLogger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
    // Enable raw body for Stripe webhook signature verification
    rawBody: true,
  });

  // ── Stripe Webhook: raw body parsing ────────────────
  // Only for the webhook endpoint — Stripe needs the raw body for signature verification
  // Use exact path match to avoid interfering with other /api/stripe/* routes
  app.use((req: any, res: any, next: any) => {
    if (req.originalUrl === '/api/stripe/webhook') {
      express.raw({ type: 'application/json' })(req, res, next);
    } else {
      next();
    }
  });

  // ── Security: Helmet HTTP headers ──────────────────────
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  // ── Security: CORS configuration ───────────────────────
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // ── Static file serving (avatars, uploads) ─────────────
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
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
