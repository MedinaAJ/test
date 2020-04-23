import { TestBed } from '@angular/core/testing';

import { OperacionesPlantillasService } from './operaciones-plantillas.service';

describe('OperacionesPlantillasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperacionesPlantillasService = TestBed.get(OperacionesPlantillasService);
    expect(service).toBeTruthy();
  });
});
