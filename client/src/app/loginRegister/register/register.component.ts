import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UrlConfigService } from '../../common-service/url-config.service';
import { Router } from '@angular/router';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmPasswordControl = c.get('confirmPassword');
  if (passwordControl.pristine || confirmPasswordControl.pristine) {
    return null;
  }
  if (passwordControl.value === confirmPasswordControl.value) {
    return null;
  }
  return { match: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private UrlConfigService: UrlConfigService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9]/)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9]/)]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: passwordMatcher }),
      secretQuestionGroup: this.fb.group({
        secretQuestion: ['', Validators.required],
        secretAnswer: ['', Validators.required]
      })
    });

    // this.registerForm.get('gender').valueChanges
    //   .subscribe(value => console.log(value));

    // this.registerForm.get('secretQuestion').valueChanges
    // .subscribe(this.registerForm.get('secretAnswer'));
  }


  register() {
    // console.log(this.registerForm);
    const payLoad = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      gender: this.registerForm.value.gender,
      email: this.registerForm.value.email,
      password: this.registerForm.value.passwordGroup.password,
      dob: this.registerForm.value.dob,
      secretQuestion: this.registerForm.value.secretQuestionGroup.secretQuestion,
      secretAnswer: this.registerForm.value.secretQuestionGroup.secretAnswer
    };

    this.UrlConfigService.postApi('REGISTER', payLoad).subscribe(
      (response) => {
        console.log(response);
        if (response['success']) {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
