import { NgModule } from '../../node_modules/@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoute: Routes = [
];


@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
