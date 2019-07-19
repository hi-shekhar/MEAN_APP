import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginregisterComponent } from './loginregister.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogintroubleComponent } from './logintrouble/logintrouble.component';

import { LoginRegisterRoutingModule } from './login.routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [LoginregisterComponent,
        LoginComponent,
        RegisterComponent,
        LogintroubleComponent],
    imports: [CommonModule,
        LoginRegisterRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ]
})

export class LoginRegister { }
