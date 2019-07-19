import { TestBed, inject } from '@angular/core/testing';

import { UrlConfigService } from './url-config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UrlConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlConfigService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([UrlConfigService], (service: UrlConfigService) => {
    expect(service).toBeTruthy();
  }));
});
