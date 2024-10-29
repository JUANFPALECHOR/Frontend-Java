import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly apiUrl = 'http://localhost:8090/api/articles';  // URL del endpoint de artículos

  constructor(private readonly http: HttpClient) {}

  // Método para crear un nuevo artículo
  createArticle(article: ArticleRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, article);
  }
}

// Interfaces para reflejar la estructura del DTO

export interface ArticleRequest {
  name: string;
  description: string;
  quantity: number;
  price: number;
  categoryIds: number[];  
  brandId: number;       
}
