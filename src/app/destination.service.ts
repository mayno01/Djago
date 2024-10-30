import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination } from './destination';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private apiUrl = 'http://127.0.0.1:8000/api/destinations/';
  private generateDescriptionUrl = 'http://127.0.0.1:8000/api/generate-description/'; // Add this line

  constructor(private http: HttpClient) { }

  getDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(this.apiUrl);
  }

  getDestination(id: number): Observable<Destination> {
    return this.http.get<Destination>(`${this.apiUrl}${id}/`);
  }

  createDestination(destination: FormData): Observable<Destination> {
    return this.http.post<Destination>(this.apiUrl, destination);
  }

  updateDestination(id: number, destination: FormData): Observable<Destination> {
    return this.http.put<Destination>(`${this.apiUrl}${id}/`, destination);
  }

  deleteDestination(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }

  // Updated method to generate description for a destination
  generateDescription(title: string): Observable<any> {
    const body = { title }; // Create the request body
    return this.http.post<any>(this.generateDescriptionUrl, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
