import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  private BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }
  login(credentials: any): Observable<any>
  {
    return this.http.post(`${this.BASE_URL}/auth/login`, credentials);
  }

  saveToken(token: string, username: string): void
  {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('username', username);
  }

  isLoggedIn(): boolean
  {
    return !!localStorage.getItem('jwtToken');
  }

  getUsername(): string
  {
    return localStorage.getItem('username') || '';
  }

  logout(): void
  {
    localStorage.clear();
  }

  private getAuthHeaders(): HttpHeaders
  {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  get(endpoint: string, id?: number): Observable<any>
  {
    const url = id ? `${this.BASE_URL}/${endpoint}/${id}` : `${this.BASE_URL}/${endpoint}`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }


  post(endpoint: string, data: any): Observable<any>
  {
    return this.http.post(`${this.BASE_URL}/${endpoint}`, data, { headers: this.getAuthHeaders() });
  }


  put(endpoint: string, id: number, data: any): Observable<any>
  {
    return this.http.put(`${this.BASE_URL}/${endpoint}/${id}`, data, { headers: this.getAuthHeaders() });
  }


  delete(endpoint: string, id: number): Observable<any>
  {
    return this.http.delete(`${this.BASE_URL}/${endpoint}/${id}`, { headers: this.getAuthHeaders() });
  }
}
