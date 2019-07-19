import { TestBed, inject } from '@angular/core/testing';

import { AuthGaurdLoginService } from './auth-gaurd-login.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGaurdLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGaurdLoginService],
      imports: [RouterTestingModule]
    });
  });

  it('should be created', inject([AuthGaurdLoginService], (service: AuthGaurdLoginService) => {
    expect(service).toBeTruthy();
  }));
});
