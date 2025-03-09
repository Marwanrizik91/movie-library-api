import { Module } from '@nestjs/common';
import { AppController } from './movies.controller';
import { AppService } from './movies.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
