import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './api.model';
import { Category } from '../stores/stories/stories.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://hn.algolia.com/api/v1';

  constructor(private http: HttpClient) {}

  getStories(page: number, category: Category): Observable<ApiResponse> {
    let url = '';
    switch (category) {
      case 'top':
        url = `${this.baseUrl}/search?tags=front_page&page=${page}`;
        break;
      case 'new':
        url = `${this.baseUrl}/search_by_date?tags=story&page=${page}`;
        break;
      default:
        url = `${this.baseUrl}/search?tags=front_page&page=${page}`;
        break;
    }

    return this.http.get<ApiResponse>(url);
  }

  getStoryDetails(id: string): Observable<ApiResponse> {
    const url = `${this.baseUrl}/search?tags=comment,story_${id}`;
    return this.http.get<ApiResponse>(url);
  }

  searchStories(query: string): Observable<ApiResponse> {
    const url = `${this.baseUrl}/search?query=${query}&tags=story`;
    return this.http.get<ApiResponse>(url);
  }
}
