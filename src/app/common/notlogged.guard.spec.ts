import { TestBed } from '@angular/core/testing';

import { NotLoggedGuard } from './notlogged.guard';

describe('NotloggedGuard', () => {
  let guard: NotLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
