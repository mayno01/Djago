import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {
  private apiUrl = 'http://127.0.0.1:8000/checkin/'; // Change to your Django API URL

  constructor(private http: HttpClient) { }

  checkIn(prompt: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, { prompt }, { headers });
  }
}
