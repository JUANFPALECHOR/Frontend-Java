import { TestBed } from '@angular/core/testing';
import { BrandService } from './brand.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        BrandService
      ],
    });
    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('debería realizar una solicitud GET con paginación y ordenación por nombre ascendente', () => {
    const mockBrands = [
      { name: 'Marca A', description: 'Descripción A' },
      { name: 'Marca B', description: 'Descripción B' }
    ];

    service.getBrands(1, 10, 'ASC').subscribe((brands) => {
      expect(brands).toEqual(mockBrands);
    });

    const req = httpMock.expectOne(req => req.method === 'GET');
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('size')).toBe('10');
    expect(req.request.params.get('sortDirection')).toBe('ASC');

    // Responde la solicitud con datos simulados
    req.flush(mockBrands);
  });

  it('debería realizar una solicitud GET con paginación y ordenación por nombre descendente', () => {
    const mockBrands = [
      { name: 'Marca Z', description: 'Descripción Z' },
      { name: 'Marca Y', description: 'Descripción Y' }
    ];

    service.getBrands(2, 5, 'DESC').subscribe((brands) => {
      expect(brands).toEqual(mockBrands);
    });

    const req = httpMock.expectOne(req => req.method === 'GET');
    expect(req.request.params.get('page')).toBe('2');
    expect(req.request.params.get('size')).toBe('5');
    expect(req.request.params.get('sortDirection')).toBe('DESC');

    // Responde la solicitud con datos simulados
    req.flush(mockBrands);
  });
});
