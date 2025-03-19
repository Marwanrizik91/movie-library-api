import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { HttpModule } from '@nestjs/axios';

const mockMoviesService = {
  getMovies: jest.fn(),
  searchMovies: jest.fn(),
  getGenres: jest.fn(),
  getMoviesByGenre: jest.fn(),
};

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: mockMoviesService,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMovies', () => {
    it('should call service with default page 1', async () => {
      const mockResult = { results: [] };
      const mockGetMovies = jest.fn().mockResolvedValue(mockResult);
      jest.spyOn(service, 'getMovies').mockImplementation(mockGetMovies);

      await expect(controller.getMovies()).resolves.toBe(mockResult);
      expect(mockGetMovies).toHaveBeenCalledWith(1);
    });

    it('should call service with specified page', async () => {
      const mockResult = { results: [] };
      const mockGetMovies = jest.fn().mockResolvedValue(mockResult);
      jest.spyOn(service, 'getMovies').mockImplementation(mockGetMovies);

      await expect(controller.getMovies(2)).resolves.toBe(mockResult);
      expect(mockGetMovies).toHaveBeenCalledWith(2);
    });
  });
  describe('searchMovies', () => {
    it('should call service with specified query and page', async () => {
      const mockResult = { results: [] };
      const mockSearchMovies = jest.fn().mockResolvedValue(mockResult);
      jest.spyOn(service, 'searchMovies').mockImplementation(mockSearchMovies);
      await expect(controller.searchMovies('query', 1)).resolves.toBe(
        mockResult,
      );
      expect(mockSearchMovies).toHaveBeenCalledWith('query', 1);
    });
  });
  describe('getGenres', () => {
    it('should call service', async () => {
      const mockResult = [];
      const mockGetGenres = jest.fn().mockResolvedValue(mockResult);
      jest.spyOn(service, 'getGenres').mockImplementation(mockGetGenres);
      await expect(controller.getGenres()).resolves.toBe(mockResult);
      expect(mockGetGenres).toHaveBeenCalled();
    });
  });
  describe('getMoviesByGenre', () => {
    it('should call service with specified genreId and page', async () => {
      const mockResult = { results: [] };
      const mockGetMoviesByGenre = jest.fn().mockResolvedValue(mockResult);
      jest
        .spyOn(service, 'getMoviesByGenre')
        .mockImplementation(mockGetMoviesByGenre);
      await expect(controller.GetMoviesByGenreId(1, 1)).resolves.toBe(
        mockResult,
      );
      expect(mockGetMoviesByGenre).toHaveBeenCalledWith(1, 1);
    });
  });
});
