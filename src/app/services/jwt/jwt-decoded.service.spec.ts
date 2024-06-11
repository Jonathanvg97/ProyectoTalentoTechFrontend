import { TestBed } from '@angular/core/testing';

import { JwtDecodedService } from './jwt-decoded.service';

describe('JwtDecodedService', () => {
  let service: JwtDecodedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtDecodedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
