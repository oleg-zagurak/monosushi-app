import { TestBed } from '@angular/core/testing';

import { UploadImageService } from './upload-image.service';
import { Storage } from '@angular/fire/storage';

describe('UploadImageService', () => {
  let service: UploadImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Storage, useValue: {}},
      ]
    });
    service = TestBed.inject(UploadImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
