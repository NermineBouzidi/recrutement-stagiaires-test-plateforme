import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent {
  currentMode:String ="type";
  quizzes: any[] = [];
  problems: any[] = [];
  selectedCategory: string;

  testForm :FormGroup;
  constructor(private http: AdminService ,private fb :FormBuilder,private router :Router,private toastr : ToastrService){}
  ngOnInit() {
    this.testForm = this.fb.group({
      category: ['', [Validators.required]],
      difficultyLevel:[''],
      passingPercentage: [null,Validators.required],
      quizzes: this.fb.array([]),
      problems: this.fb.array([])
  });
  this.loadQuiz();
  this.loadProblem();
}

switchMode(modeName: string) {
  this.currentMode = modeName;
}
loadQuiz() {
  this.http.getAllQuiz().subscribe((data: any) => {
    this.quizzes = data;
  })
}
loadProblem() {
  this.http.getAllProblem().subscribe((data: any) => {
    this.problems = data;
  })
}
get problemss (){
  return this.testForm.get('problems') as FormArray;
}
get quizzess (){
  return this.testForm.get('quizzes') as FormArray;
}
toggleQuizSelection(event: Event, quiz: any): void {
  const isChecked = (event.target as HTMLInputElement).checked;

  if (isChecked) {
    this.quizzess.push(this.fb.control(quiz.id));
  } else {
    const index = this.quizzess.controls.findIndex((control: FormControl) => control.value === quiz.id);
    this.quizzess.removeAt(index);
  }
}
toggleProblemSelection(event: Event, problem: any): void {
  const isChecked = (event.target as HTMLInputElement).checked;

  if (isChecked) {
    this.problemss.push(this.fb.control(problem.id));
  } else {
    const index = this.problemss.controls.findIndex((control: FormControl) => control.value === problem.id);
    this.problemss.removeAt(index);
  }
}
selectCategory(category: string): void {
  this.testForm.get('category').setValue(category);
}
isCategorySelected(category: string): boolean {
  return this.selectedCategory === category;
}
nextMode(){
  if (this.currentMode=="type"){
    this.currentMode="quiz";
  }else
  if (this.currentMode=="quiz"){
    this.currentMode="problem";
  }
}
submit(testForm){
  const test= testForm.value;
  console.log(test);
}
addTest(testForm){
  if(testForm.valid){
    const test= testForm.value;
    const transformedProblems = test.problems.map(problemId => ({ id: problemId }));
    const transformedQuizzes = test.quizzes.map(quizId => ({ id: quizId }));

    const finalTest = { ...test, problems: transformedProblems, quizzes: transformedQuizzes };

    console.log(finalTest);

    this.http.addTest(finalTest).subscribe(
      (response: HttpResponse<any>) => {
        console.log("Response:", response); // Log the entire response for debugging
        if (response.body && response.body.includes("Test added successfully")) {
          this.toastr.showToas("added succefully")

          // Redirect to a new page or perform any other actions after successful registration
        } else {
          alert("failed");
        }
      })
    
  }
}
}
