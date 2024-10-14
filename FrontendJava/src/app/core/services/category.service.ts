import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  // Método actualizado para obtener categorías con paginación y orden
  getCategories(page: number, size: number, sort: 'asc' | 'desc'): Observable<CategoryResponse[]> {
    // Construir parámetros de consulta
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    // Hacer la solicitud HTTP con los parámetros
    return this.http.get<CategoryResponse[]>(`${this.apiUrl}`, { params });
  }

}


// Esta interfaz representa el objeto que envías para crear una nueva categoría.
export interface CategoryRequest {
  name: string;
  description: string;
}

// Esta interfaz representa una categoría individual.
export interface Category {
  id: number;
  name: string;
  description: string;
}


// Esta interfaz es para manejar la respuesta paginada de categorías.
export interface CategoryResponse {
  categories: Category[]; // Lista de categorías
  totalElements: number;  // Total de categorías
  totalPages: number;     // Total de páginas
  currentPage: number;    // Página actual
}