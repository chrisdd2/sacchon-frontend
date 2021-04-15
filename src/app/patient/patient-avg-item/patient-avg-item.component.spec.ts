import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAvgItemComponent } from './patient-avg-item.component';

describe('PatientAvgItemComponent', () => {
  let component: PatientAvgItemComponent;
  let fixture: ComponentFixture<PatientAvgItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAvgItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAvgItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
