import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintroubleComponent } from './logintrouble.component';

describe('LogintroubleComponent', () => {
  let component: LogintroubleComponent;
  let fixture: ComponentFixture<LogintroubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogintroubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogintroubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
