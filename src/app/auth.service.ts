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
  private registerUrl = `${this.baseUrl}/register`;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    console.log('Attempting login...');
    /* const headers = new HttpHeaders({
      'X-CSRFToken': this.getCsrfToken() || '',
    });
    console.log(headers); */
    return this.http.post<any>(this.loginUrl, { username, password }, {  headers: { 'Content-Type': 'application/json' }, withCredentials : true, observe: 'response' });
  } 

  logout(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from storage
    if (!token) {
      console.log('No token found');
      return; // Token is missing, exit early
    }
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`,
    });
    return this.http.post<any>(this.logoutUrl, {}, { headers , withCredentials: true, observe : 'response' });
  }

  /*getCsrfToken(): string | null {
    const matches = document.cookie.match(/csrftoken=([^;]+)/);
    return matches ? matches[1] : null;
  }*/

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

  register(userData: { username: string; email: string; password1: string; password2: string }) : Observable<any>{
    return this.http.post<any>(this.registerUrl, userData, { observe : 'response',  });
  }


}
