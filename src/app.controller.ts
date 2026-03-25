import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): string {
    return 'PAFT CMS API is running! Visit /api/health for health check.';
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      message: 'PAFT Backend is healthy!'
    };
  }

  @Get('test')
  getTest() {
    return { message: 'Test endpoint working!' };
  }
}
