import { Movie } from './movie.model';

export interface ApiResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}
