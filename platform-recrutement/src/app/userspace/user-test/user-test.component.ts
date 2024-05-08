import { Component, Input } from '@angular/core';
import { AdminService } from 'src/app/dashboard/shared/services/admin.service';
import { UserspaceService } from '../shared/services/userspace.service';
import { timer } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'src/app/shared/services/toastr.service';
@Component({
  selector: 'app-user-test',
  templateUrl: './user-test.component.html',
  styleUrls: ['./user-test.component.scss']
})
export class UserTestComponent {
  test: any = {};
  quizzes: any[];
  problems: any[];

  exercises: any[];

  quizzesAnswers: any[] = []; // Array to store form group values
  problemAnswers: any[] = []; // Array to store form group values
  currentQuizIndex: number = 0;
  currentProblemIndex: number = 0;
  currentIndex = 0; // Index to keep track of the current item
  currentExerciseIndex = 0; // Variable to keep track of the current exercise

  constructor (private router :Router,private http :UserspaceService,private Http :AuthService, private toastr : ToastrService){}
  diasbleBack(): void {
    // Disable browser navigation
    this.router.events.subscribe((event) => {
      history.pushState(null, '', window.location.href);
    });
  }
  ngOnInit(): void {
    
    this.diasbleBack();
    this.loadTest();
    this.Submit();
   
    
  }
  loadTest(){
    const token = this.Http.getToken();
    this.http.getAssinedTest(token).subscribe((data:any)=>{
      this.test=data;
      this.quizzes= shuffle(data.test?.quizzes);
      this.problems= shuffle(data.test?.problems);
      this.exercises= shuffle([
        ...data.test?.quizzes.map(quiz => ({ ...quiz, type: 'quiz' })),
        ...data.test?.problems.map(problem => ({ ...problem, type: 'problem' }))
      ]);
      console.log(this.exercises)
      
 })

  }





  handleFormGroupValue(value: any) {
    this.currentExerciseIndex++;
    this.quizzesAnswers.push(value); // Add the form group value to the array
    console.log('Quizzes:', this.quizzesAnswers); // Optional: Log the array
    if (this.currentExerciseIndex === this.exercises.length) {
      this.Submit();
    }

  }
  handleProblemGroupValue(value: any) {
    this.currentExerciseIndex++;

    this.problemAnswers.push(value); // Add the form group value to the array
    console.log('Problems:', this.problemAnswers); // Optional: Log the array
    if (this.currentExerciseIndex === this.exercises.length) {
      this.Submit();
    }
  }
  
  receiveFormGroupValue(formGroupValue: FormGroup) {
    this.currentExerciseIndex++;

    // Handle the received form group value here
    console.log('Form Group Value:', formGroupValue);
    // Send the value to the API or perform other actions
   
  }
 

  Submit() {
    const submissionAnswers: any = {
      quizAnswers: this.quizzesAnswers,
      problemAnswers: this.problemAnswers
    };
    
    this.http.setAnswers(this.test.id,submissionAnswers)
      .subscribe(
        response => {
          console.log('Answers submitted successfully:', response);
          this.toastr.showToas("Test submitted successfull")
          this.router.navigateByUrl("/user/testCompletion");
          // Handle successful submission (e.g., display a confirmation message)
        },
        error => {
          console.error('Error submitting answers:', error);
          // Handle errors (e.g., display an error message)
        }
      );
    
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
