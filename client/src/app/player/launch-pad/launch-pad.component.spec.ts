import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchPadComponent } from './launch-pad.component';
import { HeaderNavbarComponent } from '../header-navbar/header-navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LaunchPadComponent', () => {
  let component: LaunchPadComponent;
  let fixture: ComponentFixture<LaunchPadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LaunchPadComponent, HeaderNavbarComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
