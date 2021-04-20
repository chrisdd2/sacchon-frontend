import { TestBed } from '@angular/core/testing';

import { PatientFieldsService } from './patient-fields.service';

describe('PatientFieldsService', () => {
  let service: PatientFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
