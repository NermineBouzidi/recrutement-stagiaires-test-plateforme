import { Component } from '@angular/core';
import { AdminService } from 'src/app/dashboard/shared/services/admin.service';
import { UserspaceService } from '../shared/services/userspace.service';

@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrls: ['./user-test.component.scss']
})
export class UserTestComponent {
  data: any[] = [];
currentQuestion :number=1;
  constructor(private http :UserspaceService){
  }
  ngOnInit() {
    this.loadQuiz();
  }
  loadQuiz() {
    this.http.getAllQuiz().subscribe((data: any) => {
      this.data = data;
    });
  }
  nextQuestion(){
   if (this.currentQuestion <this.data.length)
   this.currentQuestion ++;
  }

}
