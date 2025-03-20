import { NestFactory } from '@nestjs/core';
import { MoviesModule } from './movies/movies.module';

async function bootstrap() {
  const app = await NestFactory.create(MoviesModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
