import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Destination} from './destination';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private apiUrl = 'http://127.0.0.1:8000/api/destinations/';

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
}
