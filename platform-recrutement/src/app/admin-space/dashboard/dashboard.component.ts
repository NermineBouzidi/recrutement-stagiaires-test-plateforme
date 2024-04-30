import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from '../shared/services/data.service';
import { AdminService, DashboardCounts } from '../shared/services/admin.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  registrationsData: any;
  public Chart: any;
  names: string[];
  counts: DashboardCounts = { usersCount: 0, testsSubmittedCount: 0, totalTestsCount: 0 };

  constructor( private http :AdminService) {
    this.loadCounts();

  }
  ngOnInit() {
    this.fetchRegistrationsData();
    this.createChart();
    this.createCharte();
  }
  fetchRegistrationsData() {
    this.http.getUserRegistrationData().subscribe(
      data => {
        this.registrationsData = data;
        this.createChart();
      },
      error => {
        console.error('Error fetching registrations data:', error);
      }
    );
  }
  createChart() {
    const months = Object.keys(this.registrationsData);
    const counts = Object.values(this.registrationsData);    
    const ctx = document.getElementById('userRegistrationChart') as HTMLCanvasElement;
        const userRegistrationChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'New User Registrations',
                    data: counts,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Fill color
                    borderColor: 'rgba(54, 162, 235, 1)', // Line color
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
  }
  createCharte() { 
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
        const userRegistrationChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
              datasets: [{
                    label: 'Line Registrations',
                    data: [50, 60, 40, 70, 30],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Fill color
                    borderColor: 'rgba(54, 162, 235, 1)', // Line color
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
  }

  loadCounts(){
    this.http.getDashboardCounts()
    .subscribe(counts => 
      this.counts = counts);
   }
      
    
}