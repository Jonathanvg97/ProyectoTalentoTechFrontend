import { TestBed } from '@angular/core/testing';

import { BusinesDetailsService } from './busines-details.service';

describe('BusinesDetailsService', () => {
  let service: BusinesDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinesDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
