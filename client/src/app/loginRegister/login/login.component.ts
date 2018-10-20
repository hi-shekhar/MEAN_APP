import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UrlConfigService } from '../../common-service/url-config.service';
import { StoreDataService } from '../../common-service/store-data.service';
import { Router } from '@angular/router';
// import { RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isUserEmailValid: boolean;
  public gender: string;
  public loginForm: FormGroup;
  public loggedInMessage: any = {};
  public options: any;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private fb: FormBuilder, private http: HttpClient, private UrlConfigService: UrlConfigService,
    public _storeDataService: StoreDataService, private router: Router) { }

  ngOnInit(): void {
    this.isUserEmailValid = false;
    this.loginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
      userPassword: ['', [Validators.required, Validators.minLength(8),
      Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]]
    });
  }

  createAuthenticationHeaders(): void {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      })
    };
  }

  checkEmailValidity(): void {
    if (this.loginForm.controls.userEmail.status === 'VALID') {
      this.UrlConfigService.getApi('GETUSERGENDER', this.loginForm.value.userEmail).subscribe(
        (response) => {
          if (response['success']) {
            this.isUserEmailValid = true;
            this.gender = response['message'];
          } else {
            this.isUserEmailValid = false;
          }
        }
      );
      // this.gender = 'male';
    }
  }
  login(): void {
    // console.log(JSON.stringify(this.loginForm.value));
    const payLoad = {
      email: this.loginForm.value.userEmail,
      password: this.loginForm.value.userPassword
    };

    this.UrlConfigService.postApi('LOGIN', payLoad).subscribe(
      (response) => {
        const data = response;
        if (data['success']) {
          this._storeDataService.isLoggedIn = true;
          localStorage.setItem('token', data['token']); // Set token in local storage
          localStorage.setItem('user', JSON.stringify(data['user'])); // Set user in local storage as string
          this._storeDataService.userData = data['user'];
          this.loggedInMessage = {
            token: data['token'],
            userName: JSON.stringify(data['user']),
            message: data['message']
          };
          if (this._storeDataService.redirectUrl) {
            console.log(this._storeDataService.redirectUrl);
            this.router.navigate([this._storeDataService.redirectUrl]);
            this._storeDataService.redirectUrl = null;
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.loggedInMessage = {
            message: data['message']
          };

        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
