import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api/accounts/';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // Login and retrieve tokens
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}login/`, credentials);
  }

  // Store tokens in cookies
  setTokens(accessToken: string, refreshToken: string) {
    const cookieOptions = { path: '/', sameSite: 'Lax' as 'Lax' | 'Strict' | 'None' };  // Optional cookie options

    this.cookieService.set('accessToken', accessToken, cookieOptions);
    this.cookieService.set('refreshToken', refreshToken, cookieOptions);
  }

  // Get tokens from cookies
  getAccessToken(): string {
    return this.cookieService.get('accessToken');
  }

  getRefreshToken(): string {
    return this.cookieService.get('refreshToken');
  }

  // Logout by deleting tokens
  logout() {
    this.cookieService.delete('accessToken', '/');
    this.cookieService.delete('refreshToken', '/');
  }
  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}register/`, user);
  }
}
