
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/api/products';

  // Отримання всіх послуг
  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  // Отримання послуги за ID
  get(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  // Додавання нової послуги
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  // Редагування послуги
  update(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${id}`, product);
  }

  // Видалення послуги
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
