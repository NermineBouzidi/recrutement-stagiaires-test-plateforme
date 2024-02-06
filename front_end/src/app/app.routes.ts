import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationFormComponentComponent } from './components/registration-form-component/registration-form-component.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestInterfaceComponent } from './components/test-interface/test-interface.component';
import { UsersListComponent } from './components/users-list/users-list.component';

export const routes: Routes = [
        {
        path:"*",
        redirectTo:'home'
        },
    
        {
            path:'home',
            component:HomeComponent
        },
        {
            path:'form',
            component:RegistrationFormComponentComponent
        },
        {
            path:'signup',
            component:SignUpComponent
        },
        {
            path:'dashboard',
            component:DashboardComponent
        }, {
            path:'test',
            component:TestInterfaceComponent
        }, {
            path:'users',
            component:UsersListComponent
        }
    
    
];
