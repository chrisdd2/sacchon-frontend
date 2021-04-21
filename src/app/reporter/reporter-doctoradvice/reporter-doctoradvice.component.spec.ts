import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporterDoctoradviceComponent } from './reporter-doctoradvice.component';

describe('ReporterDoctoradviceComponent', () => {
  let component: ReporterDoctoradviceComponent;
  let fixture: ComponentFixture<ReporterDoctoradviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporterDoctoradviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporterDoctoradviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
