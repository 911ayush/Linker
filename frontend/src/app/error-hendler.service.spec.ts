import { TestBed } from '@angular/core/testing';

import { ErrorHendlerService } from './error-hendler.service';

describe('ErrorHendlerService', () => {
  let service: ErrorHendlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHendlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
