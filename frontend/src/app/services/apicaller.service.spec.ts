import { TestBed } from '@angular/core/testing';

import { ApiService } from './apicaller.service';

describe('ApicallerService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
