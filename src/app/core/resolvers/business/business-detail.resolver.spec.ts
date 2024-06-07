import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { businessDetailResolver } from './business-detail.resolver';

describe('businessDetailResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => businessDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
