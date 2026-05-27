import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SpacexService } from './spacex';

describe('SpacexService', () => {
  let service: SpacexService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SpacexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
