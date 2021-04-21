import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporterMedidataComponent } from './reporter-medidata.component';

describe('ReporterMedidataComponent', () => {
  let component: ReporterMedidataComponent;
  let fixture: ComponentFixture<ReporterMedidataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporterMedidataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporterMedidataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
