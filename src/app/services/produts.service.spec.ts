import { TestBed } from '@angular/core/testing';

import { ProdutsService } from './produts.service';

describe('ProdutsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdutsService = TestBed.get(ProdutsService);
    expect(service).toBeTruthy();
  });
});
