const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');
const { UsersService } = require('./dist/users/users.service');
const { NestExpressApplication } = require('@nestjs/platform-express');

async function test() {
    const app = await NestFactory.create(AppModule);
    const usersService = app.get(UsersService);

    const user = await usersService.findById(1);
    console.log("Before save:", user);

    await usersService.update(1, { phone: '0123456789', bio: 'This is a test bio' });

    const updated = await usersService.findById(1);
    console.log("After save:", updated);

    await app.close();
    process.exit(0);
}

test();
