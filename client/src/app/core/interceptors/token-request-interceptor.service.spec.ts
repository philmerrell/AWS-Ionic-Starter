import { TestBed } from '@angular/core/testing';

import { TokenRequestInterceptorService } from './token-request-interceptor.service';

describe('TokenRequestInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenRequestInterceptorService = TestBed.get(TokenRequestInterceptorService);
    expect(service).toBeTruthy();
  });
});
