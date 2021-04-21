import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorConsultAddComponent } from './doctor-consult-add.component';

describe('DoctorConsultAddComponent', () => {
  let component: DoctorConsultAddComponent;
  let fixture: ComponentFixture<DoctorConsultAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorConsultAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorConsultAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
