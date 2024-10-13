import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Define las rutas de la API en los servicios 

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl = 'http://localhost:8090/api/categories'; 

  constructor(private readonly http: HttpClient) {}

  // Método para crear una nueva categoría
  createCategory(category: CategoryRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, category);
  }

}

export interface CategoryRequest {
  name: string;
  description: string;
}