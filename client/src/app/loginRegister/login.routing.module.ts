import { NgModule } from '../../../node_modules/@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginregisterComponent } from './loginregister.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogintroubleComponent } from './logintrouble/logintrouble.component';
import { AuthGaurdLoginService } from '../common-service/auth-gaurd-login.service';


const loginRoutes: Routes = [
    {
        path: '',
        component: LoginregisterComponent,
        canActivate: [AuthGaurdLoginService],
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'trouble', component: LogintroubleComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule]
})
export class LoginRegisterRoutingModule { }
