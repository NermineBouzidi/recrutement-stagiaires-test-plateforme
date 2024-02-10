import { Component } from '@angular/core';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { TestsListComponent } from '../tests-list/tests-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardSidebarComponent,UsersListComponent,TestsListComponent,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
