import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from '../shared/services/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  names: string[];
  
  constructor(public dataService: DataService) {
    this.names = dataService.names;

    
  }

   registrationData = [
    { date: new Date(2024, 3, 20), count: 10 }, // Replace with your data
    { date: new Date(2024, 3, 21), count: 15 },
    { date: new Date(2024, 3, 22), count: 8 },
    { date: new Date(2024, 3, 23), count: 12 },
    { date: new Date(2024, 3, 24), count: 5 },
  ];
  
  public Chart: any;

  selectedOptions: string[] = [];

  createChart() {
    this.Chart = new Chart('MyChart', {
      type: 'bar',

      data: {
        labels: [
          "Prend l'ascendant sur les autres",
          'Cherche \u00e0 convaincre les autres',
          'Va spontan\u00e9ment vers les autres',
          "S'implique affectivement",
          "S'ouvre aux id\u00e9es des autres",
          'Accepte les critiques \u00e9mises',
          'Consulte avant de d\u00e9cider',
          'Est attir\u00e9 par les t\u00e2ches vari\u00e9es',
          "S'int\u00e9resse aux choses abstraites",
          "Fait preuve d'inventivit\u00e9",
          "S'adapte aux changements",
          "S'organise avec m\u00e9thode",
          'Pers\u00e9v\u00e8re face aux obstacles',
          'Va au del\u00e0 des t\u00e2ches prescrites',
          "S'attache aux d\u00e9tails",
          'Se montre d\u00e9tendu',
          "S'attache aux aspects positifs",
          'Contr\u00f4le ses \u00e9motions',
          'Recherche la stabilit\u00e9',
        ],
        datasets: [
          {
            label: 'Critere',
            data: [],
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  updateChartData() {
       const selectedNames = this.selectedOptions;
       const colors = ['blue', 'green', 'red', 'yellow'];

       const datasets = selectedNames.map((name,index) => {
         const selectedData = this.dataService.data.find((item) => item[name]);
         const dataValues = Object.values(selectedData[name]);

         return {
           label: name,
           data: dataValues,
           //backgroundColor: 'blue',
           backgroundColor: colors[index % colors.length],
         };
       });

       this.Chart.data.datasets = datasets;
       this.Chart.update();
  }

  ngOnInit(): void {
    this.createChart();
    this.createCharte();
  }
  createCharte(): void {
    const ctx = document.getElementById('userRegistrationChart') as HTMLCanvasElement;
    const userRegistrationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'New User Registrations',
                data: [10, 20, 15, 25, 30, 35], // Sample data
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
}