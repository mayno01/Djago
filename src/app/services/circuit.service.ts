import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Circuit {
  id?: number;
  name: string;
  description: string;
  location: string;
  rating: number;
  difficulty_level: number;
}
export interface Review {
  id: number;      // Unique identifier for the review
  user: number;    // User ID or reference to the user who made the review
  circuit: number; // ID of the circuit being reviewed
  rating: number;  // Rating value (e.g., 1 to 5)
  comment?: string; // Optional comment or feedback about the circuit
}

@Injectable({
  providedIn: 'root',
})
export class CircuitService {
  private baseUrl = 'http://localhost:8001'; // Update this with your Django API URL

  constructor(private http: HttpClient) {}

  getCircuits(): Observable<Circuit[]> {
    return this.http.get<Circuit[]>(`${this.baseUrl}/api/circuits/circuits/`);
  }

  getCircuit(id: number): Observable<Circuit> {
    return this.http.get<Circuit>(`${this.baseUrl}/api/circuits/circuits/${id}/`);
  }

  createCircuit(circuit: Circuit): Observable<Circuit> {
    return this.http.post<Circuit>(`${this.baseUrl}/api/circuits/circuits/`, circuit); // Update to include the correct endpoint
  }

  updateCircuit(id: number, circuit: Circuit): Observable<Circuit> {
    return this.http.put<Circuit>(`${this.baseUrl}/api/circuits/circuits/${id}/`, circuit);
  }
  

  deleteCircuit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/circuits/circuits/${id}/`); // Ensure this matches your API
  }
    // Fetch reviews for a specific circuit
    
getReviews(circuitId: number): Observable<Review[]> {
  return this.http.get<Review[]>(`${this.baseUrl}/api/circuits/${circuitId}/reviews/`);
}
    addReview(review: Review): Observable<Review> {
      return this.http.post<Review>(`${this.baseUrl}/reviews/`, review);
    }
}
