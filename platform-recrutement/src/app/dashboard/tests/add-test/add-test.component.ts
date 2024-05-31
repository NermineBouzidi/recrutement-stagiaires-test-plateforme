import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent {
  isSubmitted: boolean = false;
  quizzes: any[] = [];
  problems: any[] = [];
  selectedCategory: string = 'All';
  selectedTestId :string=null;
  totalDuration  = 0;
  evaluators: any[]; // Define an array to store evaluator data
  isPassedDuration : boolean =false;  
  testForm :FormGroup;
  constructor(private http: AdminService ,private fb :FormBuilder,private router :Router,private toastr : ToastrService,private cdr: ChangeDetectorRef,private route: ActivatedRoute){
    this.testForm = this.fb.group({
      category: ['', [Validators.required]],
      title:['',[Validators.required]],
      createdBy:['',[Validators.required]],
      passingPercentage: [null,[Validators.required,Validators.max(100)]],
      quizzes: this.fb.array([]),
      problems: this.fb.array([])
  });
  this.loadQuiz();
  this.loadProblem();
  this.selectedTestId = this.route.snapshot.paramMap.get('test');
  if(this.selectedTestId){
    this.getTestById(this.selectedTestId);
  }
  this.getAllEvaluator();
  
  }
  
 


//------------load quizzes-------------------------
loadQuiz() {
  this.http.getAllQuiz().subscribe((data: any) => {
    this.quizzes = data;
  })
}
//-----------------load problems -----------------------
loadProblem() {
  this.http.getAllProblem().subscribe((data: any) => {
    this.problems = data;
  })
}

//----------------------- filter problems--------------------------------
get filteredProblems(): any[] {
  return this.selectedCategory === 'All'
  ? this.problems // Display all quizzes if 'ALL' is selected
  : this.problems.filter(problem => problem.category !== null && problem.category.includes(this.selectedCategory));
};
  
//------------------filter quizzes---------------------------------
get filteredQuizzes(): any[] {
  return this.selectedCategory === 'All'
      ? this.quizzes // Display all quizzes if 'ALL' is selected
      : this.quizzes.filter(quiz => quiz.category !== null && quiz.category.includes(this.selectedCategory));
  };


// ------------------quizzes--------------------------------------
get quizzess (){
  return this.testForm.get('quizzes') as FormArray;
}
toggleQuizSelection(event: Event, quiz: any): void {
  const isChecked = (event.target as HTMLInputElement).checked;

  if (isChecked) {
    this.quizzess.push(this.fb.control(quiz.id));
    this.totalDuration += Math.floor( quiz.duration /60 );

  } else {
    const index = this.quizzess.controls.findIndex((control: FormControl) => control.value === quiz.id);
    this.quizzess.removeAt(index);
    this.totalDuration -= Math.floor( quiz.duration /60 );

  }
  this.cdr.detectChanges();

}
isQuizSelected(quizId: number): boolean {
  return this.quizzess.value.includes(quizId);
}

//------------------------problems
get problemss (){
  return this.testForm.get('problems') as FormArray;
}
toggleProblemSelection(event: Event, problem: any): void {
  const isChecked = (event.target as HTMLInputElement).checked;

  if (isChecked) {
    this.problemss.push(this.fb.control(problem.id));
    this.totalDuration += problem.duration ;

  } else {
    const index = this.problemss.controls.findIndex((control: FormControl) => control.value === problem.id);
    this.problemss.removeAt(index);
    this.totalDuration -= problem.duration ;

  }
}
isProblemSelected(problemId: number): boolean {
  return this.testForm.get('problems').value.includes(problemId);
}

//-------------add test ----------------------- -----
addTest(testForm){
  this.isSubmitted = true;
  if (this.totalDuration>120){ 
    this.isPassedDuration =true
 } else{
  this.isPassedDuration = false
 }
  if(testForm.valid && !this.isPassedDuration){
    const test= testForm.value;
    const transformedProblems = test.problems.map(problemId => ({ id: problemId }));
    const transformedQuizzes = test.quizzes.map(quizId => ({ id: quizId }));

    const finalTest = { ...test, problems: transformedProblems, quizzes: transformedQuizzes };

    console.log(finalTest);
    if (this.selectedTestId) {
      this.http.updateTest(this.selectedTestId, finalTest).subscribe(
        (response: HttpResponse<any>) => {
          this.toastr.showToas("updated successfully");
          this.router.navigateByUrl("/dashboard/test");
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating quiz:', error);
        }
      );
    }else{
    this.http.addTest(finalTest).subscribe(
      (response: HttpResponse<any>) => {
        console.log("Response:", response); // Log the entire response for debugging
        if (response.body && response.body.includes("Test added successfully")) {
          this.toastr.showToas("added succefully")
          this.router.navigateByUrl("/dashboard/test");

          // Redirect to a new page or perform any other actions after successful registration
        } else {
          alert("failed");
        }
      })
    }
    
  }
}

//----------------------get test ----------------------------------------------------
getTestById(testId: any) {
  this.http.getTestById(testId).subscribe((data: any) => {
    this.testForm.patchValue(data); // Patch form with test data

    // Mark selected quizzes as checked
    this.quizzess.clear();
    this.problemss.clear();
   
    // Mark selected quizzes as checked
    const selectedQuizzes = data.quizzes;
    selectedQuizzes.forEach(quiz=> {
      this.quizzess.push(this.fb.control(quiz.id));
    });

    // Mark selected problems as checked
    const selectedProblems = data.problems;
    selectedProblems.forEach(problem => {
        this.problemss.push(this.fb.control(problem.id));
      });
      this.totalDuration =data.totalDuration;
  });
}


getAllEvaluator(){
  this.http.getAllEvaluator().subscribe((data: any) => {
    this.evaluators = data;
  })
}
}
