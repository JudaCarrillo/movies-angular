export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: Type;
  Poster: string;
}

enum Type {
  Movie = 'movie',
  Series = 'series',
}
