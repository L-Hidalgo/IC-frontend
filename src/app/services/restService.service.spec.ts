import { TestBed } from '@angular/core/testing';

import { RestService } from './restSerice.service';

describe('ProveedoresService', () => {
  let service: RestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestService);
  });

  it('Get Date', () => {
    console.log(service.getConnection());
    expect(service).toBeTruthy();
  });

});
