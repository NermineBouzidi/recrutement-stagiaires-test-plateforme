import { Component, Input } from '@angular/core';
import { timer, takeWhile, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserspaceService } from '../shared/services/userspace.service';
import { DurationToTimerPipe } from '../shared/services/duration-to-timer.pipe';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-user-quiz',
  templateUrl: './user-quiz.component.html',
  styleUrls: ['./user-quiz.component.scss']
})
export class UserQuizComponent {
  @Input() quiz: any;
  data: any[] = [];
  test: any = {};
  currentQuestion :number=1;
  userAnswers: Map<number, string> = new Map<number, string>();
  score: number = 0;
  isTestCompleted: boolean = false; 
  counter = 120; // Counter in seconds
  displayTime: string;
  
  formGroup: FormGroup;

  constructor(private http :UserspaceService,private Http :AuthService,private fb: FormBuilder){
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
      this.formGroup = this.fb.group({
        id: [null], // Optional - Set to null for new answers
        quiz: [null, Validators.required],
        trueFalseAnswer: [null],
        multipleChoiceAnswers: this.fb.array([]),
        points: [null],
        testSubmission: [null, Validators.required], // Mandatory association
      });
  }
  
  private minutesToHHMMSS(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursStr = hours < 10 ? '0' + hours : hours;
    const minutesStr = remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes;

    return `${hoursStr}:${minutesStr}:00`;
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
    const token = this.Http.getToken();
    this.http.getAssinedTest(token).subscribe((data:any)=>{
      this.test=data;
      this.data=data.quizzes
      for (const question of this.data) {
        shuffle(question.choices); // Randomize choices for each question
    }
    });
  }
  nextQuestion(selectedChoice: string) {
    console.log(this.data)
    if (this.currentQuestion <= this.data.length ) {
      this.userAnswers.set(this.currentQuestion, selectedChoice);
      const correctAnswer = this.data[this.currentQuestion - 1].correctAnswer ||
      this.data[this.currentQuestion - 1].choices.find(choice => choice.correct);
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


  get multipleChoiceAnswersArray(): FormArray {
    return this.formGroup.get('multipleChoiceAnswers') as FormArray;
  }

  addMultipleChoiceAnswer() {
    this.multipleChoiceAnswersArray.push(this.fb.group({
      id: [null], // Optional - Set to null for new choices
    }));
  }

  removeMultipleChoiceAnswer(index: number) {
    this.multipleChoiceAnswersArray.removeAt(index);
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


