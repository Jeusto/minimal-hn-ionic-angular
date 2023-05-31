import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://hn.algolia.com/api/v1';

  constructor(private http: HttpClient) {}

  getFrontPageStories(page: number): Observable<ApiResponse> {
    const url = `${this.baseUrl}/search?tags=front_page&page=${page}`;
    return this.http.get<ApiResponse>(url);
  }

  getLatestStories(): Observable<ApiResponse> {
    const url = `${this.baseUrl}/search_by_date?tags=story`;
    return this.http.get<ApiResponse>(url);
  }

  getStoryDetails(id: string): Observable<ApiResponse> {
    const url = `${this.baseUrl}/search?tags=comment,story_${id}`;
    return this.http.get<ApiResponse>(url);
  }

  searchStory(query: string): Observable<ApiResponse> {
    const url = `${this.baseUrl}/search?query=${query}&tags=story`;
    return this.http.get<ApiResponse>(url);
  }
}
