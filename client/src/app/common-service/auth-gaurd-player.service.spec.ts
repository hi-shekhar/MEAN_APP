import { TestBed, inject } from '@angular/core/testing';

import { AuthGaurdPlayerService } from './auth-gaurd-player.service';

describe('AuthGaurdPlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGaurdPlayerService]
    });
  });

  it('should be created', inject([AuthGaurdPlayerService], (service: AuthGaurdPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
