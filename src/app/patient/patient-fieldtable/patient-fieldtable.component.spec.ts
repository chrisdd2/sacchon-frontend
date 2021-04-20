import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFieldtableComponent } from './patient-fieldtable.component';

describe('PatientFieldtableComponent', () => {
  let component: PatientFieldtableComponent;
  let fixture: ComponentFixture<PatientFieldtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientFieldtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFieldtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
