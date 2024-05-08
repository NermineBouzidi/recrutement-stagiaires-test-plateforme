import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-test-preview',
  templateUrl: './test-preview.component.html',
  styleUrls: ['./test-preview.component.scss']
})
export class TestPreviewComponent {
  
  quiz: any;
  problem: any;
  isQuiz :boolean=false;
  isProblem :boolean=false;

  constructor(private route: ActivatedRoute,private http: AdminService){
    const quizId = this.route.snapshot.paramMap.get('quiz');
    const problemId = this.route.snapshot.paramMap.get('problem');

    this.getQuiz(quizId);
    this.getProblem(problemId);
  }

  getQuiz(quizId :any){
    this.http.getQuizById(quizId).subscribe((res)=>{
      this.isQuiz=true;
       this.quiz=res;
    })
  }
  getProblem(problemId :any){
    this.http.getProblemById(problemId).subscribe((res)=>{
      this.isProblem=true;
       this.problem=res;
    })
  }
}
