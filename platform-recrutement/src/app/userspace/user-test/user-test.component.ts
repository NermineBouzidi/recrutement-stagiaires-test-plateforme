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
  userAnswers: Map<number, string> = new Map<number, string>();
  score: number = 0;
  isTestCompleted: boolean = false; 
  constructor(private http :UserspaceService){
  }
  ngOnInit() {
    this.loadQuiz();
  }
  loadQuiz() {
    this.http.getAllQuiz().subscribe((data: any) => {
      this.data = data;
      for (const question of this.data) {
        shuffle(question.choices); // Randomize choices for each question
    }
    });
  }
  nextQuestion(selectedChoice: string) {
    console.log(this.data)
    if (this.currentQuestion <= this.data.length ) {
      this.userAnswers.set(this.currentQuestion, selectedChoice);
      const correctAnswer = this.data[this.currentQuestion -1].answers[0];
      if (selectedChoice === correctAnswer) {
        this.score++;
        console.log(this.score)
      }
      this.currentQuestion++;
      if (this.currentQuestion > this.data.length) {
        this.isTestCompleted = true; // Mark test as completed
      }
    }
  }
  checkAnswer(){

  }

}
function shuffle(array: any[]) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}


