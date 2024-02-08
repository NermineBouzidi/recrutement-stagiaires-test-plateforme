import { Component } from '@angular/core';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardSidebarComponent,UsersListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
