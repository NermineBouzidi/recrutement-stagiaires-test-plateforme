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
  public userRegistrationChart: any;

  registrationsData: any;
  public Chart: any;
  selectedYear: number = new Date().getFullYear(); // Initialize with current year
  years: number[] = [2024, 2023, 2022]; // Example list of years
  counts: DashboardCounts = { usersCount: 0, testsSubmittedCount: 0, totalTestsCount: 0 };

  constructor(private http: AdminService) {}

  ngOnInit() {
    this.fetchRegistrationsData();
    this.loadCounts();
  }
  //load counts
  loadCounts(){
    this.http.getDashboardCounts().subscribe(
      (data:any) => {
        this.counts=data;
      }
    )
  }

  fetchRegistrationsData() {
    this.http.getUserRegistrationData(this.selectedYear).subscribe(
      data => {
        this.registrationsData = data;
        this.createChart();
      },
      error => {
        console.error('Error fetching registrations data:', error);
      }
    );
  }

  onYearChange(event: any) {
    this.selectedYear = event.target.value;
    this.fetchRegistrationsData();
  }
  

  createChart() {
    if (!this.registrationsData) return; // Ensure registrationsData is available
    const allMonths = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
                     'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    const months = Object.keys(this.registrationsData);
    const counts = Object.values(this.registrationsData);
    const monthData = this.registrationsData; // No need to separate keys/values

    // Combine all months with corresponding counts (fill zeros for missing months)
    const combinedData = allMonths.map(month => monthData[month] || 0);

    console.log("counts", counts,"combined",combinedData);
    const ctx = document.getElementById('userRegistrationChart') as HTMLCanvasElement;
  
    // Destroy existing chart if it exists
    if (this.userRegistrationChart) {
      this.userRegistrationChart.destroy();
    }
  
    // Create new chart
    this.userRegistrationChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: allMonths,
        datasets: [{
          label: 'Candidats Registration',
          data: combinedData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)', // Fill color
          borderColor: 'rgba(54, 162, 235, 1)', // Line color
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }
  
 
}