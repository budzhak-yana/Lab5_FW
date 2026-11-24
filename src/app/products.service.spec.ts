import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(ProductsService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('отримує список товарів', () => {
    service.list().subscribe(data => expect(data.length).toBe(2));
    const req = http.expectOne('/api/products');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, name: 'A', price: 100, category: 'Вії', description: '' }, { id: 2, name: 'B', price: 200, category: 'Брови', description: '' }]);
  });
  it('створює товар через POST', () => {
    const p = { name: 'Test', category: 'Вії', price: 100, description: '' };
    service.create(p).subscribe(result => expect(result.id).toBe(3));
    const req = http.expectOne('/api/products');
    expect(req.request.method).toBe('POST');
    req.flush({ ...p, id: 3 });
  });
});
