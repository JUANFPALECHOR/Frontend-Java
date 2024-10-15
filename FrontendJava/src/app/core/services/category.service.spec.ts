import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CategoryService
      ],
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('debería realizar una solicitud GET con paginación y ordenación por nombre ascendente', () => {
    const mockCategories = [
      { name: 'Categoría A', description: 'Descripción A' },
      { name: 'Categoría B', description: 'Descripción B' }
    ];

    service.getCategories(1, 10, 'asc').subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(req => req.method === 'GET');
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('size')).toBe('10');
    expect(req.request.params.get('orden')).toBe('asc');

    // Responde la solicitud con datos simulados
    req.flush(mockCategories);
  });

  it('debería realizar una solicitud GET con paginación y ordenación por nombre descendente', () => {
    const mockCategories = [
      { name: 'Categoría Z', description: 'Descripción Z' },
      { name: 'Categoría Y', description: 'Descripción Y' }
    ];

    service.getCategories(2, 5, 'desc').subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(req => req.method === 'GET');
    expect(req.request.params.get('page')).toBe('2');
    expect(req.request.params.get('size')).toBe('5');
    expect(req.request.params.get('orden')).toBe('desc');

    // Responde la solicitud con datos simulados
    req.flush(mockCategories);
  });
});