import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreDataService {

  constructor() { }
  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  public redirectUrl: string;
  public userLoginData: Object;
  public retriveEmail: string;
  set userData(data: Object) {
    this.userLoginData = data;
    console.log(this.userLoginData);
  }

  get userData() {
    return this.userLoginData;
  }

}
