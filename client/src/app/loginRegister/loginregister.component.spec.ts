import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginregisterComponent } from './loginregister.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginregisterComponent', () => {
  let component: LoginregisterComponent;
  let fixture: ComponentFixture<LoginregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginregisterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
