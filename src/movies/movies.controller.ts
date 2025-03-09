import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies(@Query('page') page: number = 1) {
    return this.moviesService.getMovies(page);
  }

  @Get('search')
  searchMovies(@Query('query') query: string, @Query('page') page: number = 1) {
    return this.moviesService.searchMovies(query, page);
  }

  @Get('genres')
  getGenres() {
    return this.moviesService.getGenres();
  }

  @Get('genre')
  GetMoviesByGenreId(
    @Query('genreId') genreId: number,
    @Query('page') page: number = 1,
  ) {
    return this.moviesService.getMoviesByGenre(genreId, page);
  }
}
