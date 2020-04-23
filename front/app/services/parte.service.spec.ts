import { TestBed } from '@angular/core/testing';

import { ParteService } from './parte.service';

describe('ParteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParteService = TestBed.get(ParteService);
    expect(service).toBeTruthy();
  });
});
