import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationFormComponentComponent } from './components/registration-form-component/registration-form-component.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/Dadh/dashboard/dashboard.component';
import { TestInterfaceComponent } from './components/test-interface/test-interface.component';
import { UsersListComponent } from './components/Dadh/users-list/users-list.component';
import { TestsListComponent } from './components/Dadh/tests-list/tests-list.component';
import { CreateTestComponent } from './components/Dadh/create-test/create-test.component';

export const routes: Routes = [
        {
        path:'*',
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
            component:DashboardComponent,
            children :[
                {
                    path:"tests",
                    component:TestsListComponent,
                   
                
                },
                {
                    path:"users",
                    component:UsersListComponent
                },
                {
                    path:"add",
                    component:CreateTestComponent
                }
            ]
        }, 
        {
            path:'test',
            component:TestInterfaceComponent
        }
        
    
    
];
