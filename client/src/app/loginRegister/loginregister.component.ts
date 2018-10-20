import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-loginregister',
  templateUrl: './loginregister.component.html',
  styleUrls: ['./loginregister.component.scss'],
  // No Shadow DOM at all
  encapsulation: ViewEncapsulation.None

})
export class LoginregisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
