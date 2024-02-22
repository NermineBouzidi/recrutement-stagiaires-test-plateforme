import { TestBed } from '@angular/core/testing';

import { UserspaceService } from './userspace.service';

describe('UserspaceService', () => {
  let service: UserspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
