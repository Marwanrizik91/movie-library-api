import { NestFactory } from '@nestjs/core';
import { MoviesModule } from './movies/movies.module';

async function bootstrap() {
  const app = await NestFactory.create(MoviesModule);
  app.setGlobalPrefix('api'); // Add the 'api' prefix
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
