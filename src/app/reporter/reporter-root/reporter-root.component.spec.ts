import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporterRootComponent } from './reporter-root.component';

describe('ReporterRootComponent', () => {
  let component: ReporterRootComponent;
  let fixture: ComponentFixture<ReporterRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporterRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporterRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
