import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporterHomeComponent } from './reporter-home.component';

describe('ReporterHomeComponent', () => {
  let component: ReporterHomeComponent;
  let fixture: ComponentFixture<ReporterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporterHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
