import { TestBed } from '@angular/core/testing';

import { DatosAuthLocalService } from './datos-auth-local.service';

describe('DatosAuthLocalService', () => {
  let service: DatosAuthLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosAuthLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
