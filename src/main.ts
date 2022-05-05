import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as fs from 'fs';

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('./secrets/localhost-key.pem'),
  //   cert: fs.readFileSync('./secrets/localhost.pem'),
  // };
  const app = await NestFactory.create(AppModule, {
    // httpsOptions,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
    }),
  );
  app.use(
    session({
      secret: 'test',
      resave: 'false',
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(8000);
}
bootstrap();
