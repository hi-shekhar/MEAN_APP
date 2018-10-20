import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/* This property points to a module and the service will be put into this module's injection scope.
The value 'root' is just a shortcut for the root injector's scope;*/

@Injectable({
  providedIn: 'root'
})
export class UrlConfigService {

  constructor(private http: HttpClient) { }
  public baseUrl = 'http://localhost:8080/';

  public appendUrl = {
    'REGISTER': 'authentication/register',
    'LOGIN': 'authentication/login',
    'LOGINTROUBLE': 'authentication/loginTrouble',
    'GETEMAIL': 'authentication/getEmail',
    'RESETPASSWORD': 'authentication/resetPassword',
    'GETUSERGENDER': 'authentication/getGender',
    'GETPROFILE': 'authentication/getProfile',
    'UPDATEPROFILE': 'authentication/updateProfile',
    'CHANGEPASSWORD': 'authentication/changePassword'
  };


  postApi(key: string, payLoad: object): Observable<any> {
    const fullUrl = this.baseUrl + this.appendUrl[key];
    return this.http.post(fullUrl, payLoad).pipe(
      map((response: Response) => response)
    );
  }

  getApi(key: string, param: string): Observable<any> {
    let fullUrl;
    if (!param) {
      fullUrl = this.baseUrl + this.appendUrl[key];
    } else {
      fullUrl = this.baseUrl + this.appendUrl[key] + '/' + param;
    }
    return this.http.get(fullUrl).pipe(
      map((response: Response) => response)
    );
  }

  putApi(key: string, payLoad: object): Observable<any> {
    const fullUrl = this.baseUrl + this.appendUrl[key];
    return this.http.put(fullUrl, payLoad).pipe(
      map((response: Response) => response)
    );
  }

  getWithHeaderApi(key: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      })
    };
    const fullUrl = this.baseUrl + this.appendUrl[key];

    return this.http.get(fullUrl, httpOptions).pipe(
      map((response: Response) => response)
    );
  }
  putWithHeaderApi(key: string, payLoad: object): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      })
    };
    const fullUrl = this.baseUrl + this.appendUrl[key];
    return this.http.put(fullUrl, payLoad, httpOptions).pipe(
      map((response: Response) => response)
    );
  }
}
