import { TestBed } from '@angular/core/testing';

import { CurrCalendarService } from './curr-calendar.service';

describe('CurrCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrCalendarService = TestBed.get(CurrCalendarService);
    expect(service).toBeTruthy();
  });
});
