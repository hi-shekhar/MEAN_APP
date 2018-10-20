import { Injectable } from '@angular/core';
import { StoreDataService } from './store-data.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdLoginService {
  constructor(private _storeDataService: StoreDataService, private router: Router) { }
  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('home');
      return false;
    } else {
      return true;
    }
  }
}
