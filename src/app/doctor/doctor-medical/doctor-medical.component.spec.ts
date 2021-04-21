import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMedicalComponent } from './doctor-medical.component';

describe('DoctorMedicalComponent', () => {
  let component: DoctorMedicalComponent;
  let fixture: ComponentFixture<DoctorMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorMedicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
