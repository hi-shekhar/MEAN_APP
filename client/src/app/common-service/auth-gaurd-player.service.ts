import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { StoreDataService } from './store-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdPlayerService implements CanActivate {

  constructor(private _storeDataService: StoreDataService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       /**The ActivatedRouteSnapshot contains the future route that will be activated and
     * the RouterStateSnapshot contains the future RouterState of the application,
     * should you pass through the guard check. */
    const url: string = state.url;
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this._storeDataService.redirectUrl = url;
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
