import { Component, EventEmitter, Input, Output } from '@angular/core';
import { timer, takeWhile, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserspaceService } from '../shared/services/userspace.service';
import { DurationToTimerPipe } from '../shared/services/duration-to-timer.pipe';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-quiz',
  templateUrl: './user-quiz.component.html',
  styleUrls: ['./user-quiz.component.scss']
})
export class UserQuizComponent {
  @Input() quiz: any;
  @Output() formGroupValue = new EventEmitter<FormGroup>();

  data: any[] = [];
  test: any = {};
  currentQuestion :number=1;
  userAnswers: Map<number, string> = new Map<number, string>();
  score: number = 0;
  isTestCompleted: boolean = false; 
  counter = 120; // Counter in seconds
  displayTime: string;
   remainingMinutes: number = 0;
  remainingSeconds: number = 0;
  quizAnswerForm: FormGroup;

  constructor(private http :UserspaceService,private Http :AuthService,private fb: FormBuilder){
    
      this.quizAnswerForm = this.fb.group({
        quiz: [null],
        trueFalseAnswer: [null],
        multipleChoiceAnswers: this.fb.array([]),
        points: [null],
      });
  }
  ngOnInit() {
    this.loadQuiz();
    this.startTimer()
  }
  startTimer(): void {
    let totalSeconds = this.quiz.duration // Set initial time (e.g., 60 seconds)

    const timer = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--; // Decrease remaining time every second
        this.remainingMinutes = Math.floor(totalSeconds / 60);
        this.remainingSeconds = totalSeconds % 60;
      } else {
        clearInterval(timer); // Stop the timer when time is up
        this.emitFormGroupValue(); // Submit the form when timer ends
        // Handle what should happen next (e.g., move to the next quiz)
      }
    }, 1000); // Timer runs every second (1000 milliseconds)
  }
  formatTime(time: number): string {
    return time < 10 ? '0' + time : time.toString();
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
  


  get multipleChoiceAnswersArray(): FormArray {
    return this.quizAnswerForm.get('multipleChoiceAnswers') as FormArray;
  }

  addMultipleChoiceAnswer() {
    this.multipleChoiceAnswersArray.push(this.fb.group({
      id: [null], // Optional - Set to null for new choices
    }));
  }

  removeMultipleChoiceAnswer(index: number) {
    this.multipleChoiceAnswersArray.removeAt(index);
  }
  
  emitFormGroupValue() {
    const questionType = this.quiz.questionType;
    const quiz= this.quizAnswerForm.value;
    const transformedquiz = {id:this.quiz.id};
    const transformedAnswers = quiz.multipleChoiceAnswers.map(Id => ({ id: Id }));
    let transformedPoints= 0;
    // Check if quiz.choices is defined before accessing its properties
    const correctChoices = this.quiz.choices?.filter((choice: any) => choice.correct)?.map((choice: any) => choice.id) || [];
    
    if (questionType === 'MultipleChoiceQuestion') {
    if (this.doArraysHaveSameElements(quiz.multipleChoiceAnswers,correctChoices)){
        transformedPoints = this.quiz.points; // Full points for correct True/False

      }
      
    } else if (questionType === 'TrueFalseQuestion') {
      const correctAnswer = this.quiz.correctAnswer;
      const userAnswer = quiz.trueFalseAnswer;
      if (userAnswer !== undefined && userAnswer === correctAnswer) {
        transformedPoints = this.quiz.points; // Full points for correct True/False
      } 
      
      else {
        transformedPoints = 0; // No points for incorrect True/False
      }
    }
    
    const finalFormGroup = { ...quiz, quiz: transformedquiz, multipleChoiceAnswers: transformedAnswers, points:transformedPoints };
    console.log(finalFormGroup)
    this.formGroupValue.emit(finalFormGroup);

  }
  toggleQuizSelection(event: Event, quiz: any): void {
    const isChecked = (event.target as HTMLInputElement).checked;
  
    if (isChecked) {
      this.multipleChoiceAnswersArray.push(this.fb.control(quiz.id));
    } else {
      const index = this.multipleChoiceAnswersArray.controls.findIndex((control: FormControl) => control.value === quiz.id);
      this.multipleChoiceAnswersArray.removeAt(index);
    }
  }
  doArraysHaveSameElements(arr1: any[], arr2: any[]): boolean {
    // Handle empty arrays or arrays with different lengths
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    // Convert arrays to sets to handle duplicates and order independence
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
  
    // Check if all elements from set1 are present in set2 (and vice versa)
    return set1.size === set2.size && [...set1].every(element => set2.has(element));
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



