import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { createWinstonLogger } from './common/logger.config';

async function bootstrap() {
  try {
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
    const corsOriginEnv = process.env.CORS_ORIGIN || '';
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://172.21.128.1:3000',
      ...corsOriginEnv.split(',').map(o => o.trim()).filter(Boolean),
    ];
    app.enableCors({
      origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS: origin ${origin} not allowed`));
        }
      },
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

    // MonsterASP.NET: IIS provides PORT via HTTP_PLATFORM_PORT
    const port = process.env.PORT || process.env.HTTP_PLATFORM_PORT || 3000;
    await app.listen(port, '0.0.0.0');
    logger.log(`🚀 PAFT CMS API is running on port: ${port}`);
    logger.log(`📋 Health check: /api/health`);
    logger.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  } catch (error) {
    require('fs').appendFileSync('startup-error.txt', `[${new Date().toISOString()}] Failed to start application: ${error?.stack || error}\n`);
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}
bootstrap().catch((error) => {
  require('fs').appendFileSync('startup-error.txt', `[${new Date().toISOString()}] Bootstrap failed: ${error?.stack || error}\n`);
  console.error('❌ Bootstrap failed:', error);
  process.exit(1);
});
