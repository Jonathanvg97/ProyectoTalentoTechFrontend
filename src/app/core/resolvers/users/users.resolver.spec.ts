import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { usuariosResolver } from './users.resolver';

describe('usuariosResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => usuariosResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
