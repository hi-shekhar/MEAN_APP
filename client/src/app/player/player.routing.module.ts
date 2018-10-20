import { NgModule } from '../../../node_modules/@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LaunchPadComponent } from './launch-pad/launch-pad.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { AuthGaurdPlayerService } from '../common-service/auth-gaurd-player.service';



const playerRoutes: Routes = [
    {
        path: 'home',
        component: LaunchPadComponent,
        canActivate: [AuthGaurdPlayerService]
    }, {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGaurdPlayerService]
    }, {
        path: 'changePassword',
        component: ChangePasswordComponent,
        canActivate: [AuthGaurdPlayerService]
    }, {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
        canActivate: [AuthGaurdPlayerService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(playerRoutes)],
    exports: [RouterModule]
})
export class PlayerRoutingModule { }
