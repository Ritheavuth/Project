import { TestBed } from '@angular/core/testing';

import { AccountapiService } from './accountapi.service';

describe('AccountapiService', () => {
  let service: AccountapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
