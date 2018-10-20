import { Component, OnInit, Input } from '@angular/core';
import { StoreDataService } from '../../common-service/store-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss']
})
export class HeaderNavbarComponent implements OnInit {

  constructor(private _storeDataService: StoreDataService, private router: Router) { }

  @Input() public userName: string;
  ngOnInit() {
    const user = localStorage.getItem('user');
    this.userName = JSON.parse(user).FirstName;
    console.log(this._storeDataService.userData);
  }

  public logout() {
    localStorage.clear();
    this._storeDataService.userData = {};
    this.router.navigate(['/login']);
  }

}
