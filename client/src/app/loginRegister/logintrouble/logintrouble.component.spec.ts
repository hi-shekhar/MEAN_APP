import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintroubleComponent } from './logintrouble.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LogintroubleComponent', () => {
  let component: LogintroubleComponent;
  let fixture: ComponentFixture<LogintroubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogintroubleComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule]
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
