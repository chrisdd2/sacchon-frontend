import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTableComponent } from './fieldtable.component';

describe('PatientFieldtableComponent', () => {
  let component: FieldTableComponent;
  let fixture: ComponentFixture<FieldTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
