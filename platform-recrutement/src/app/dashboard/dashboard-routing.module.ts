import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { TestComponent } from './tests/test/test.component';
import { UidashboardComponent } from './uidashboard/uidashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { DashComponent } from './dash/dash.component';
import { RapportComponent } from './rapports/rapport/rapport.component';
import { TestPreviewComponent } from './test-preview/test-preview.component';
import { UiTestComponent } from './tests/ui-test/ui-test.component';
import { UiRapportsComponent } from './rapports/ui-rapports/ui-rapports.component';

const routes: Routes = [
   {path :"" ,component :DashComponent},
   {path :"uidash" ,component :DashComponent},
   {path:"user",component :UserComponent},
   {path:"test",component :UiTestComponent,
   loadChildren: () => import('./tests/tests.module').then((m)=> m.TestsModule)
  },
   {path: "profile", component:ProfileComponent},
   {path:"rapport",component :UiRapportsComponent,
   loadChildren: () => import('./rapports/rapports.module').then((k)=> k.RapportsModule)
  },
   


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
