import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

//Define las rutas de la API en los servicios 

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly apiUrl = 'http://localhost:8090/api/brands';  

  constructor(private readonly http: HttpClient) {}

  // Método para crear una nueva marca
  createBrand(brand: BrandRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, brand);
  }

  // Método para obtener marcas con paginación y orden
  getBrands(page: number, size: number, sortDirection: 'ASC' | 'DESC'): Observable<BrandResponse> {
    // Construir parámetros de consulta
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortDirection', sortDirection.toUpperCase());

    // Hacer la solicitud HTTP con los parámetros
    return this.http.get<BrandResponse>(this.apiUrl, { params });
  }
}

// Interfaces para reflejar la estructura de la respuesta
export interface Brand {
  id: number;
  name: string;
}

export interface BrandResponse {
  content: Brand[];      // Array con las marcas
  last: boolean;         // Indica si es la última página
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

// Esta interfaz representa el objeto que envías para crear una nueva marca.
export interface BrandRequest {
  name: string;
  description: string;
}
