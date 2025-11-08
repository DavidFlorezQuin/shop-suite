import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SaleItem {
  productId: number;
  quantity: number;
  subtotal: number;
}

export interface Sale {
  id?: number;
  date?: string;
  total?: number;
  items: SaleItem[];
}

@Injectable({ providedIn: 'root' })
export class SaleService {
  private apiUrl = 'http://localhost:5217/api/Sales';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiUrl);
  }

  getById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.apiUrl}/${id}`);
  }

  create(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.apiUrl, sale);
  }
}
