import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  app.use(passport.initialize());

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, X-API-KEY, Origin, Authorization',
  });

  const isLocalDevelopment = process.env.NODE_ENV === 'dev';

  if (isLocalDevelopment) {
    // Create a Swagger document
    const config = new DocumentBuilder()
      .setTitle('Meowio API')
      .setDescription('API for Meowio blogging engine')
      .setVersion('1.0')
      .addTag('API')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    // Set up Swagger UI on the '/api' route only in local development
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT);
}
bootstrap();
