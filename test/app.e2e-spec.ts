import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MoviesModule } from '../src/movies/movies.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MoviesModule,
        ConfigModule.forRoot({ isGlobal: true }),
        HttpModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/api/movies (GET)', () => {
    it('should return movies with 200 status code', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/movies')
        .expect(200);

      expect(response.body).toHaveProperty('results');
    });

    it('should handle pagination with page parameter', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/movies?page=2')
        .expect(200);

      expect(response.body).toHaveProperty('page', 2);
    });
  });
});
