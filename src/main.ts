import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('OnetimeLinks API')
    .setDescription('Описание API сервиса одноразовых ссылок')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}

bootstrap()
  .then(() => console.log(`Сервис стартовал на порту ${PORT}`))
  .catch((error) => console.error(`Ошибка запуска: ${error}`));
