import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './utils/winston.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Swagger example')
    .setDescription('The example of Swagger')
    .setVersion('1.0')
    .addTag('ex')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  app.enableCors();
  const looger = winstonLogger;
  app.useLogger(looger);
  await app.listen(3000);

}
bootstrap();
