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
  //charts
  public userRegistrationChart: any;
  public userRegistrationCategoryChart: any;
  public TestCreationChart: any;
  //years
  selectedRegistrationYear: number = new Date().getFullYear(); // Initialize with current year
  selectedRegistrationByCategoryYear: number = new Date().getFullYear(); // Initialize with current year
  selectedTestYear: number = new Date().getFullYear(); // Initialize with current year
  //data
  mobileDevelopmentData: any;
  webDevelopmentData: any;
  dataScienceData: any;
  registrationByMonthData: any;
  testsByMonthData: any;
  registrationByCategoryData: any;
  statusByCatgeory:any;

  years: number[] = [2024, 2023, 2022]; // Example list of years
  counts: DashboardCounts = { usersCount: 0, testsSubmittedCount: 0, totalTestsCount: 0 };
  data :any={WEB_DEVELOPMENT :0,MOBILE_DEVELOPMENT:0,DATA_SCIENCE:0}
  constructor(private http: AdminService) {}

  ngOnInit() {
    this.fetchRegistrationByMonthData();
    this.fetchRegistrationByCategoryData();
    this.loadCounts();
    this.fetchStatusByCategoryData();
    this.fetchChartData();
  }
  //load counts
  loadCounts(){
    this.http.getDashboardCounts().subscribe(
      (data:any) => {
        this.counts=data;
      }
    )
  }

  fetchRegistrationByMonthData() {
    this.http.getUserRegistrationByMonth(this.selectedRegistrationYear).subscribe(
      data => {
        this.registrationByMonthData = data;
        this.createChart();
      },
      error => {
        console.error('Error fetching registrations data:', error);
      }
    );
  }
  fetchStatusByCategoryData() {
    this.http.getUserStatusBycategory(this.selectedRegistrationByCategoryYear ).subscribe(
      data => {
        this.statusByCatgeory = data;
        console.log("all data",data,"mbile",this.statusByCatgeory.MOBILE_DEVELOPMENT,"web",this.statusByCatgeory.WEB_DEVELOPMENT)
      },
      error => {
        console.error('Error fetching registrations data:', error);
      }
    );
  }
  fetchRegistrationByCategoryData() {
    this.http.getUserRegistrationByCategory(this.selectedRegistrationByCategoryYear ).subscribe(
      data => {
        this.registrationByCategoryData = data;
        console.log(data)
        this.createUserRegistrationByCategoryChart();
      },
      error => {
        console.error('Error fetching registrations data:', error);
      }
    );
  }
   fetchTestsByMonthData() {
    this.http.getTestCreationByMonth(this.selectedTestYear).subscribe(
      data => {
        this.testsByMonthData = data;
        this.createTestChart();
      },
      error => {
        console.error('Error fetching registrations data:', error);
      }
    );
  }
  

  onRegistrationYearChange(event: any) {
    this.selectedRegistrationYear = event.target.value;
    this.fetchRegistrationByMonthData();
  }
  onRegistrationCategoryYearChange(event: any) {
    this.selectedRegistrationByCategoryYear = event.target.value;
    this.fetchRegistrationByCategoryData();
  }
  onTestYearChange(event: any) {
    this.selectedTestYear = event.target.value;
    this.fetchTestsByMonthData();
  }
  

  createChart() {
    if (!this.registrationByMonthData) return; // Ensure registrationByMonthData is available
    const allMonths = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
                     'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    const months = Object.keys(this.registrationByMonthData);
    const counts = Object.values(this.registrationByMonthData);
    const monthData = this.registrationByMonthData; // No need to separate keys/values

    // Combine all months with corresponding counts (fill zeros for missing months)
    const combinedData = allMonths.map(month => monthData[month] || 0);

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
  createTestChart() {
    if (!this.testsByMonthData) return; // Ensure testsByMonthData is available
    const allMonths = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
                     'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    const months = Object.keys(this.testsByMonthData);
    const counts = Object.values(this.testsByMonthData);
    const monthData = this.testsByMonthData; // No need to separate keys/values

    // Combine all months with corresponding counts (fill zeros for missing months)
    const combinedData = allMonths.map(month => monthData[month] || 0);

    const ctx = document.getElementById('TestCreationChart') as HTMLCanvasElement;
  
    // Destroy existing chart if it exists
    if (this.TestCreationChart) {
      this.TestCreationChart.destroy();
    }
  
    // Create new chart
    this.TestCreationChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: allMonths,
        datasets: [{
          label: 'Test Creation',
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
  createUserRegistrationByCategoryChart() {
    if (!this.registrationByCategoryData) return; // Ensure registrationByMonthData is available
    const allMonths = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
                     'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    const category = Object.keys(this.registrationByCategoryData);
    const counts = Object.values(this.registrationByCategoryData);
    const monthData = this.registrationByMonthData; // No need to separate keys/values

    // Combine all months with corresponding counts (fill zeros for missing months)
    const combinedData = allMonths.map(month => monthData[month] || 0);

    const ctx = document.getElementById('userRegistrationCategoryChart') as HTMLCanvasElement;
  
    // Destroy existing chart if it exists
    if (this.userRegistrationCategoryChart) {
      this.userRegistrationCategoryChart.destroy();
    }
  
    // Create new chart
    this.userRegistrationCategoryChart = new Chart(ctx, {
      type: 'pie', // Use 'pie' for pie chart
      data: {
        labels : category,
        datasets: [{
          label: 'User Registrations by Specialization',
          data: counts,
          backgroundColor: [ // Provide an array of colors for pie chart slices
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            // Add more colors as needed for your specializations
          ],
          borderColor: [ // Provide an array of border colors for slices
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            // Add more colors for borders
          ],
          borderWidth: 1
        }]
      },
      options: {
        // Add any specific options for pie chart here (optional)
      }
    });
  }
  creatWebDevelopmentPieChart() {
    if (!this.statusByCatgeory) return; // Ensure registrationByMonthData is available
   

    const category = Object.keys(this.registrationByCategoryData);
    const counts = Object.values(this.registrationByCategoryData);
    const monthData = this.registrationByMonthData; // No need to separate keys/values

    // Combine all months with corresponding counts (fill zeros for missing months)

    const ctx = document.getElementById('userRegistrationCategoryChart') as HTMLCanvasElement;
  
    // Destroy existing chart if it exists
    if (this.userRegistrationCategoryChart) {
      this.userRegistrationCategoryChart.destroy();
    }
  
    // Create new chart
    this.userRegistrationCategoryChart = new Chart(ctx, {
      type: 'pie', // Use 'pie' for pie chart
      data: {
        labels : category,
        datasets: [{
          label: 'User Registrations by Specialization',
          data: counts,
          backgroundColor: [ // Provide an array of colors for pie chart slices
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            // Add more colors as needed for your specializations
          ],
          borderColor: [ // Provide an array of border colors for slices
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            // Add more colors for borders
          ],
          borderWidth: 1
        }]
      },
      options: {
        // Add any specific options for pie chart here (optional)
      }
    });
  }
  fetchChartData() {
    // Assuming ApiService returns the API response
    this.http.getUserStatusBycategory(this.selectedRegistrationByCategoryYear).subscribe((data: any) => {
      // Extract data for Mobile Development
      this.mobileDevelopmentData = data.MOBILE_DEVELOPMENT;

      // Extract data for Web Development
      this.webDevelopmentData = data.WEB_DEVELOPMENT;
      this.dataScienceData =data.DATA_SCIENCE

      // Generate pie charts
      this.generatePieChart('mobileDevelopmentChart', 'Mobile Development', this.mobileDevelopmentData);
      this.generatePieChart('webDevelopmentChart', 'Web Development', this.webDevelopmentData);
      this.generatePieChart('dataScienceChart', 'Data Science', this.dataScienceData);

    });
  }
  generatePieChart(chartId: string, categoryName: string, data: any) {
    const acceptedCount = data.Accepted || 0;
    const rejectedCount = data.Rejected || 0;
    const total = acceptedCount + rejectedCount;

    const acceptedPercentage = (acceptedCount / total) * 100;
    const rejectedPercentage = (rejectedCount / total) * 100;

    const ctx = document.getElementById(chartId) as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Accepted', 'Rejected'],
        datasets: [{
          data: [acceptedPercentage, rejectedPercentage],
          backgroundColor: ['#36A2EB', '#FF6384']
        }]
      },
      options: {
      
      }
    });
  }

}