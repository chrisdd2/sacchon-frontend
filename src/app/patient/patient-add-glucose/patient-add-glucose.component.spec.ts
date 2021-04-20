import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAddGlucoseComponent } from './patient-add-glucose.component';

describe('PatientAddGlucoseComponent', () => {
  let component: PatientAddGlucoseComponent;
  let fixture: ComponentFixture<PatientAddGlucoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAddGlucoseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAddGlucoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
