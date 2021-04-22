import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporterActivityComponent } from './reporter-activity.component';

describe('ReporterActivityComponent', () => {
  let component: ReporterActivityComponent;
  let fixture: ComponentFixture<ReporterActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporterActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporterActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
