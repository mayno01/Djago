import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hotel {
  id?: number;
  name: string;
  location: string;
  rating: number;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private baseUrl = 'http://127.0.0.1:8000'; // Update with your Django endpoint

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Get all hotels
  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}/hotels/`);
  }

  // Get a hotel by ID
  getHotel(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}/hotels/${id}/`);
  }

  // Create a new hotel
  createHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(`${this.baseUrl}/hotels/new/`, hotel, this.httpOptions);
  }

  // Update an existing hotel
  updateHotel(id: number, hotel: Hotel): Observable<any> {
    return this.http.put(`${this.baseUrl}/hotels/${id}/edit/`, hotel, this.httpOptions);
  }

  // Delete a hotel
  deleteHotel(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/hotels/${id}/delete/`, this.httpOptions);
  }
}
