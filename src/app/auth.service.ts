import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000'; // Base URL for your Django backend
  private loginUrl = `${this.baseUrl}/`;
  private logoutUrl = `${this.baseUrl}/logout`;
  private signUpUrl = `${this.baseUrl}/sign-up`;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    console.log('Attempting login...');
    const headers = new HttpHeaders({
      'X-CSRFToken': this.getCsrfToken() || '',
    });
    console.log(headers);
    return this.http.post<any>(this.loginUrl, { username, password }, { headers, withCredentials : true});
  } 

  logout(): Observable<any> {
    return this.http.post<any>(this.logoutUrl, {}, { withCredentials: true });
  }

  getCsrfToken(): string | null {
    const matches = document.cookie.match(/csrftoken=([^;]+)/);
    return matches ? matches[1] : null;
  }

  setToken(access: string, refresh?: string): void {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Get the saved refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  


}
