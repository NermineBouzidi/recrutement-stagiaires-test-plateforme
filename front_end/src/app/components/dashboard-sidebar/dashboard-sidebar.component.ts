import { Component } from '@angular/core';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [UsersListComponent],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.css'
})
export class DashboardSidebarComponent {

}
