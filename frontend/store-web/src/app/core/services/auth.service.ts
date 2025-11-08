import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5217/api/Auth'; // ✅ Cambia el puerto aquí
  private tokenKey = 'accessToken';


  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
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
