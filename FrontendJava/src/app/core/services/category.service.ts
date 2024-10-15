import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

//Define las rutas de la API en los servicios 

@Injectable({
  providedIn: 'root'
})
// Servicio ajustado para coincidir con el formato de respuesta del backend
export class CategoryService {
  private readonly apiUrl = 'http://localhost:8090/api/categories'; 

  constructor(private readonly http: HttpClient) {}

  // Método para crear una nueva categoría
  createCategory(category: CategoryRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, category);
  }

  // Método actualizado para obtener categorías con paginación y orden
  getCategories(page: number, size: number, order: 'asc' | 'desc'): Observable<CategoryResponse> {
    // Construir parámetros de consulta
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('order', order);

    // Hacer la solicitud HTTP con los parámetros
    return this.http.get<CategoryResponse>(this.apiUrl, { params });
  }
}

// Interfaces para reflejar la estructura de la respuesta
export interface Category {
  id: number;
  name: string;
}

export interface CategoryResponse {
  content: Category[];      // Array con las categorías
  last: boolean;            // Indica si es la última página
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}



// Esta interfaz representa el objeto que envías para crear una nueva categoría.
export interface CategoryRequest {
  name: string;
  description: string;
}

