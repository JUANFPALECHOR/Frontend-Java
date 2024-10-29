import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService, ArticleRequest } from './article.service';
import { HttpClient } from '@angular/common/http';

describe('ArticleService', () => {
  jest.useFakeTimers();
  let service: ArticleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService]
    });
    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crear un artículo correctamente', () => {
    const mockArticle: ArticleRequest = {
      name: 'Artículo de prueba',
      description: 'Descripción del artículo de prueba',
      quantity: 5,
      price: 100.50,
      categoryIds: [1, 2],
      brandId: 1
    };

    service.createArticle(mockArticle).subscribe(response => {
      expect(response).toBe(undefined);
    });

    const req = httpMock.expectOne('http://localhost:8090/api/articles');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockArticle);
    req.flush(null);
  });
});
