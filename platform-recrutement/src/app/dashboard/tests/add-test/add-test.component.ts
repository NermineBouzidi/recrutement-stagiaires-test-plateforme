import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent {
  currentMode:String ="type";
  isSubmitted: boolean = false;
  quizzes: any[] = [];
  problems: any[] = [];
  selectedCategory: string = '';


  

  testForm :FormGroup;
  constructor(private http: AdminService ,private fb :FormBuilder,private router :Router,private toastr : ToastrService,private cdr: ChangeDetectorRef,private route: ActivatedRoute){
    this.testForm = this.fb.group({
      category: ['', [Validators.required]],
      difficultyLevel:[''],
      passingPercentage: [null,Validators.required],
      quizzes: this.fb.array([]),
      problems: this.fb.array([])
  });
  this.loadQuiz();
  this.loadProblem();
  const testId = this.route.snapshot.paramMap.get('test');
  this.getTestById(testId);
  }
 

switchMode(modeName: string) {
  this.currentMode = modeName;
  this.cdr.detectChanges();

}
//loading
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

///// filtrage 
get filteredProblems(): any[] {
  return this.problems.filter(problem => {
    // Check if the search text matches the user's name, role, or email
    return problem.category !== null && problem.category.includes(this.selectedCategory);
  });
}
get filteredQuizzes(): any[] {
  return this.quizzes.filter(quiz => {
    // Check if the search text matches the user's name, role, or email
    return quiz.category !== null && quiz.category.includes(this.selectedCategory);
  });
}

// ------------------
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
  this.cdr.detectChanges();

}
isQuizSelected(quizId: number): boolean {
  return this.quizzess.value.includes(quizId);
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

//-------------submit button -----
submit(testForm){
  const test= testForm.value;
  console.log(test);
}

addTest(testForm){
  this.isSubmitted = true;

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
          this.router.navigateByUrl("/dashboard/test");

          // Redirect to a new page or perform any other actions after successful registration
        } else {
          alert("failed");
        }
      })
    
  }
}
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

    console.log("api:", data, "form:", this.testForm);
  });
}



}
