import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAddCarbComponent } from './patient-add-carb.component';

describe('PatientAddCarbComponent', () => {
  let component: PatientAddCarbComponent;
  let fixture: ComponentFixture<PatientAddCarbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAddCarbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAddCarbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
