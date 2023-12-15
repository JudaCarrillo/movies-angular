import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../models/apiResponse.model';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private key = 'd0b61c9e';
  private baseUrl = `http://www.omdbapi.com/?apikey=${this.key}`;
  private _htpp = inject(HttpClient);

  public getMoviesByTitle(searchTerm: string): Observable<Movie[]> {
    return this._htpp.get<ApiResponse>(`${this.baseUrl}&s=${searchTerm}`).pipe(map(response => {
      return response.Search
    }));
  }
}
