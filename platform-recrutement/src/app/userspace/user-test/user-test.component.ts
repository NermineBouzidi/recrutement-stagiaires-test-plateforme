import { Component } from '@angular/core';
import { AdminService } from 'src/app/dashboard/shared/services/admin.service';
import { UserspaceService } from '../shared/services/userspace.service';
import { timer } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
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
  counter = 120; // Counter in seconds
  displayTime: string;
  constructor(private http :UserspaceService){
     timer(1000, 1000) // Initial delay 1 second and interval countdown also 1 second
      .pipe(
        takeWhile(() => this.counter > 0),
        tap(() => {
          this.counter--;
          this.displayTime = this.secondsToHHMMSS(this.counter);
        })
      )
      .subscribe(() => {
        // Add your more code
      });
  }

  private secondsToHHMMSS(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hoursStr = hours < 10 ? '0' + hours : hours;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secondsStr = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
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


