import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GenresResponse, MoviesResponse } from './movies.interfaces';

@Injectable()
export class MoviesService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.getOrThrow<string>('TMDB_API_KEY');
    this.baseUrl = this.configService.getOrThrow<string>('TMDB_BASE_URL');
  }

  private buildUrl(
    endpoint: string,
    params: Record<string, string | number> = {},
  ): string {
    const queryParams = new URLSearchParams({
      api_key: this.apiKey.toString(),
      ...Object.entries(params).reduce(
        (acc, [key, value]) => {
          acc[key] = value.toString();
          return acc;
        },
        {} as Record<string, string>,
      ),
    });
    return `${this.baseUrl}${endpoint}?${queryParams.toString()}`;
  }

  getMovies(page: number = 1): Observable<MoviesResponse> {
    const url = this.buildUrl('/discover/movie', { page });
    return this.httpService
      .get<MoviesResponse>(url)
      .pipe(map((response) => response.data));
  }

  searchMovies(query: string, page: number = 1): Observable<MoviesResponse> {
    const url = this.buildUrl(`/search/movie`, { query, page });
    return this.httpService
      .get<MoviesResponse>(url)
      .pipe(map((response) => response.data));
  }

  getGenres(): Observable<GenresResponse> {
    const url = this.buildUrl(`/genre/movie/list`);
    return this.httpService
      .get<GenresResponse>(url)
      .pipe(map((response) => response.data));
  }

  getMoviesByGenre(
    genreId: number,
    page: number = 1,
  ): Observable<MoviesResponse> {
    const url = this.buildUrl(`/discover/movie`, {
      with_genres: genreId,
      page,
    });
    return this.httpService
      .get<MoviesResponse>(url)
      .pipe(map((response) => response.data));
  }
}
