import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of } from 'rxjs';
import {
  ApiBookmarksResponse,
  ApiSearchResponse,
  ApiStoryDetails,
} from '../models/api.model';
import { Category } from '../models/stories.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://hn.algolia.com/api/v1';

  constructor(private http: HttpClient) {}

  getStories(page: number, category: Category): Observable<ApiSearchResponse> {
    let url = '';
    switch (category) {
      case 'top':
        url = `${this.baseUrl}/search?tags=front_page&page=${page}`;
        break;
      case 'new':
        url = `${this.baseUrl}/search_by_date?tags=story&page=${page}`;
        break;
      case 'best':
        url = `${this.baseUrl}/search?page=${page}`;
        break;
      default:
        url = `${this.baseUrl}/search?tags=front_page&page=${page}`;
        break;
    }

    return this.http.get<ApiSearchResponse>(url);
  }

  getStoryDetails(id: string): Observable<ApiStoryDetails> {
    const url = `${this.baseUrl}/items/${id}`;
    return this.http.get<ApiStoryDetails>(url);
  }

  getStory(id: string) {
    const url = `${this.baseUrl}/search?query=&tags=story,story_${id}`;
    return this.http.get<ApiSearchResponse>(url);
  }

  searchStories(query: string): Observable<ApiSearchResponse> {
    const url = `${this.baseUrl}/search?query=${query}&tags=story`;
    return this.http.get<ApiSearchResponse>(url);
  }

  getListOfStories(ids: string[]): Observable<ApiBookmarksResponse> {
    if (ids.length === 0) return of({ hits: [] });

    const requests = ids.map((id) => this.getStory(id));
    return forkJoin(requests).pipe(
      map((responses) => {
        const stories = responses.map((response) => response.hits[0]);
        return { hits: stories };
      })
    );
  }
}
