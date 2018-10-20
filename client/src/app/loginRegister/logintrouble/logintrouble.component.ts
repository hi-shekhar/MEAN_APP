import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

import { UrlConfigService } from '../../common-service/url-config.service';
import { Router } from '@angular/router';
import { StoreDataService } from '../../common-service/store-data.service';

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

// interface LogTroubleResponse {
//   success: boolean;
//   message: string;
// }
@Component({
  selector: 'app-logintrouble',
  templateUrl: './logintrouble.component.html',
  styleUrls: ['./logintrouble.component.scss']
})
export class LogintroubleComponent implements OnInit {

  public loginTroubleForm: FormGroup;
  public reasonSelected: string;
  public loginTroubleResult;
  public isSuccess: boolean;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    // tslint:disable-next-line:no-shadowed-variable
    private UrlConfigService: UrlConfigService,
    private route: Router,
    public _storeDataService: StoreDataService) { }


  ngOnInit() {
    this.loginTroubleForm = this.fb.group({
      forgot: ['', Validators.required],
      dob: ['', Validators.required],
      secretQuestionGroup: this.fb.group({
        secretQuestion: ['', Validators.required],
        secretAnswer: ['', Validators.required]
      }),
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: passwordMatcher }
      ),
      email: ['', [Validators.required, Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]]
    });

    this.loginTroubleForm.get('forgot').valueChanges.subscribe((reason) => { this.changeValidity(reason); });
  }


  public changeValidity(reason): void {
    this.reasonSelected = reason;
    if (reason === 'email') {
      this.loginTroubleForm.get('passwordGroup.password').setValidators(null);
      this.loginTroubleForm.get('passwordGroup.password').updateValueAndValidity();

      this.loginTroubleForm.get('passwordGroup.confirmPassword').setValidators(null);
      this.loginTroubleForm.get('passwordGroup.confirmPassword').updateValueAndValidity();

      this.loginTroubleForm.get('email').setValidators(null);
      this.loginTroubleForm.get('email').updateValueAndValidity();

      this.loginTroubleForm.get('dob').setValidators(Validators.required);
      this.loginTroubleForm.get('secretQuestionGroup.secretQuestion').setValidators(Validators.required);
      this.loginTroubleForm.get('secretQuestionGroup.secretAnswer').setValidators(Validators.required);
    } else {
      this.loginTroubleForm.get('passwordGroup.password').setValidators([Validators.required, Validators.minLength(8),
      Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]);
      this.loginTroubleForm.get('passwordGroup.confirmPassword').setValidators(Validators.required);
      this.loginTroubleForm.get('email').setValidators([Validators.required,
      Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]);
      this.loginTroubleForm.get('dob').setValidators(null);
      this.loginTroubleForm.get('dob').updateValueAndValidity();

      this.loginTroubleForm.get('secretQuestionGroup.secretQuestion').setValidators(null);
      this.loginTroubleForm.get('secretQuestionGroup.secretQuestion').updateValueAndValidity();

      this.loginTroubleForm.get('secretQuestionGroup.secretAnswer').setValidators(null);
      this.loginTroubleForm.get('secretQuestionGroup.secretAnswer').updateValueAndValidity();

    }
  }

  public loginTrouble(): void {
    console.log(this.loginTroubleForm);
    let payLoad;
    if (this.reasonSelected === 'email') {
      payLoad = {
        dob: this.loginTroubleForm.value.dob,
        secretQuestion: this.loginTroubleForm.value.secretQuestionGroup.secretQuestion,
        secretAnswer: this.loginTroubleForm.value.secretQuestionGroup.secretAnswer
      };

      this.UrlConfigService.postApi('GETEMAIL', payLoad).subscribe(
        (response) => {
          console.log(response);
          if (response['success']) {
            this.isSuccess = true;
            this.loginTroubleResult = response;
            this._storeDataService.retriveEmail = response.message;
            setTimeout(() => {
              this.route.navigate(['/login']);
            }, 1000);
          } else {
            this.isSuccess = false;
            this.loginTroubleResult = response;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      payLoad = {
        email: this.loginTroubleForm.value.email,
        password: this.loginTroubleForm.value.passwordGroup.password,
      };
      this.UrlConfigService.putApi('RESETPASSWORD', payLoad).subscribe(
        (response) => {
          if (response['success']) {
            this.isSuccess = true;
            this.loginTroubleResult = response;
            setTimeout(() => {
              this.route.navigate(['/login']);
            }, 1000);
          } else {
            this.isSuccess = false;
            this.loginTroubleResult = response;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
