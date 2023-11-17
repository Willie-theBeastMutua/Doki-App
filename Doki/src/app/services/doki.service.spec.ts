import { TestBed } from '@angular/core/testing';

import { DokiService } from './doki.service';

describe('DokiService', () => {
  let service: DokiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DokiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
