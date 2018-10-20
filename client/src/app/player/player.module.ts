import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { LaunchPadComponent } from './launch-pad/launch-pad.component';

import { PlayerRoutingModule } from './player.routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PlayerRoutingModule
  ],
  declarations: [
    HeaderNavbarComponent,
    LaunchPadComponent,
    ProfileComponent,
    ChangePasswordComponent
    ]
})
export class PlayerModule { }
