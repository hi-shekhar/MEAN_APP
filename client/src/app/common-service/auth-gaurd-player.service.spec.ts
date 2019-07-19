import { TestBed, inject } from '@angular/core/testing';

import { AuthGaurdPlayerService } from './auth-gaurd-player.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGaurdPlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGaurdPlayerService],
      imports: [RouterTestingModule]
    });
  });

  it('should be created', inject([AuthGaurdPlayerService], (service: AuthGaurdPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
