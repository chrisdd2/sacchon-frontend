import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgItemComponent } from './avg-item.component';

describe('AvgItemComponent', () => {
  let component: AvgItemComponent;
  let fixture: ComponentFixture<AvgItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
