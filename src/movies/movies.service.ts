import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GenresResponse, MoviesResponse } from './movies.interfaces';

@Injectable()
export class MoviesService {
  private apiKey: string;
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('TMDB_API_KEY', '');
  }

  getMovies(page: number = 1): Observable<MoviesResponse> {
    return this.httpService
      .get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&page=${page}`)
      .pipe(map((response: AxiosResponse<MoviesResponse>) => response.data));
  }

  searchMovies(query: string, page: number = 1): Observable<MoviesResponse> {
    return this.httpService
      .get(
        `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`,
      )
      .pipe(map((response: AxiosResponse<MoviesResponse>) => response.data));
  }

  getGenres(): Observable<GenresResponse> {
    return this.httpService
      .get(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`)
      .pipe(map((response: AxiosResponse<GenresResponse>) => response.data));
  }
}
