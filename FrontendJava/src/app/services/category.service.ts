import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/categories'; 

  constructor(private http: HttpClient) {}

  // Método para crear una nueva categoría
  createCategory(category: any): Observable<any> {
    return this.http.post(this.apiUrl, category);
  }

  
}
