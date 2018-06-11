import { TestBed, inject } from '@angular/core/testing';

import { PreparationService } from './preparation.service';

describe('PreparationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreparationService]
    });
  });

  it('should be created', inject([PreparationService], (service: PreparationService) => {
    expect(service).toBeTruthy();
  }));
});
