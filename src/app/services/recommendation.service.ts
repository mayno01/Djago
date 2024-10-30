import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private apiUrl = 'http://127.0.0.1:8001/api/circuits/recommendations/get_recommendations/'; // Adjust based on your Django setup

  constructor(private http: HttpClient) { }

  getRecommendations(data: { budget: number; num_people: number; days_of_travel: number; preferred_difficulty: number; preferred_rating: number; }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, data, { headers });
  }
}
