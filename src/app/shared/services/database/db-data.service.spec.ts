import { TestBed, async } from '@angular/core/testing';

import { DbDataService } from './db-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('DbDataService', () => {
  let service: DbDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(DbDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP GET request to get all objects', (() => {
    const mockData = [true];
    service.API = 'products';

    service.getAll<boolean>().subscribe(data => {
      expect(data).withContext('result data').toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.BACK_URL}products`);
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  }));

  it('should make an HTTP GET request to get just one object', (() => {
    const mockData = {value: true, id: 1};
    service.API = 'product';

    service.getOne<typeof mockData>(mockData.id).subscribe(data => {
      expect(data).withContext('result data').toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.BACK_URL}product/${mockData.id}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  }));

  it('should make an HTTP POST request to create an object', (() => {
    const mockDataReq = {value: true};
    const mockDataRes = {value: true, id: 1};
    service.API = 'categories';

    service.create<typeof mockDataReq, typeof mockDataRes>(mockDataReq).subscribe(data => {
      expect(data).withContext('result data').toEqual(mockDataRes);
    });

    const req = httpMock.expectOne(`${environment.BACK_URL}categories`);
    expect(req.request.method).toBe('POST');

    req.flush(mockDataRes);
  }));

  it('should make an HTTP DELETE request to delete an object', (() => {
    const mockId = 1;
    service.API = 'categories';

    service.delete(mockId).subscribe();

    const req = httpMock.expectOne(`${environment.BACK_URL}categories/${mockId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  }));

  it('should make an HTTP PATCH request to update an object', (() => {
    const mockDataReq = {value: true};
    const mockDataRes = {value: true, id: 1};
    service.API = 'categories';

    service.update<typeof mockDataReq, typeof mockDataRes>(mockDataRes.id, mockDataReq).subscribe();

    const req = httpMock.expectOne(`${environment.BACK_URL}categories/${mockDataRes.id}`);
    expect(req.request.method).toBe('PATCH');

    req.flush(mockDataRes);
  }));

  it('should make an HTTP GET request to get all objects of choosen category', (() => {
    const mockData = [true];
    const category = 'roli';
    service.API = 'products';

    service.getByCategory<boolean>(category).subscribe(data => {
      expect(data).withContext('result data').toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.BACK_URL}products/?category.path=${category}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  }));

});
