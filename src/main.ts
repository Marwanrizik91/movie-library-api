import { NestFactory } from '@nestjs/core';
import { AppModule } from './movies/movies.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Add the 'api' prefix
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
