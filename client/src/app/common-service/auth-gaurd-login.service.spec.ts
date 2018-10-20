import { TestBed, inject } from '@angular/core/testing';

import { AuthGaurdLoginService } from './auth-gaurd-login.service';

describe('AuthGaurdLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGaurdLoginService]
    });
  });

  it('should be created', inject([AuthGaurdLoginService], (service: AuthGaurdLoginService) => {
    expect(service).toBeTruthy();
  }));
});
