import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationFormComponentComponent } from './components/registration-form-component/registration-form-component.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    
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
        }
    
    
];
