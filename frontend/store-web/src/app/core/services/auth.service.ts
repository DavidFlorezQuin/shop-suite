import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5217/api/Auth'; 
  private tokenKey = 'accessToken';


  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.accessToken) {
          localStorage.setItem('token', response.accessToken);
        }
      })
    );
  }
  

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
