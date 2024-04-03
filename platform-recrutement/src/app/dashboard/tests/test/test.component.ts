import { Component } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { SigninComponent } from 'src/app/signin/signin.component';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Test } from 'src/app/models/Test';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/Quiz';
import { ToastrService } from 'src/app/shared/services/toastr.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  p:any =0;
  quizs: any[] = [];
  tests: any[] = [];
  quizNumber:number;
  problems:any[]=[];
  problemNumber:number;
  currentSection:String ="Alltests";
  currentMode:String ="show";
  optionss =["hello there ", " it is true that "];
  quiz :Quiz;
  option :any[]=[];
  quizShow :Quiz;
  selectedQuizId :string = null;
  selectedProblemId :string = null;
  isDialogOpen: boolean = false;
  isShowDialog :boolean=false;
  quizForm :FormGroup;
  problemForm :FormGroup;
  trueFalseForm :FormGroup;
  multiChoiceForm :FormGroup;
  constructor(private http: AdminService ,private fb :FormBuilder,private router :Router,private toastr : ToastrService) {
    for(let i:number=1; i<=100;i++){
      this.quizs.push(i as never);
    }
  }
  ngOnInit() {
    this.problemForm = this.fb.group({
      title: ['', [Validators.required]],
      language: [''],
      description: [''],
      input: [''],
      output: [''],
      duration: [''],
      points: [''],
  });
  this.trueFalseForm = this.fb.group({
    title: ['', [Validators.required]],
    question: [''],
    duration: [''],
    points: [''],
    correctAnswer:['']
  })
    this.multiChoiceForm= this.fb.group({
      title: ['', [Validators.required]],
      question: [''],
      duration: [''],
      points: [''],
      choices: this.fb.array([this.createOptionFormGroup()]),

    })
 
   
    this.loadQuiz();
    this.loadProblems();
    this.loadTest();


  }
  createOptionFormGroup(): FormGroup {
    return this.fb.group({
      text: [''], // Initialize as an empty FormControl
      correct: [false]
    });
  }
  

 
 

  // Toggle editing mode for an option
 // Toggle editing mode for an option


  removeOption(index: number) {
    this.choices.removeAt(index);
  }
 // return tests
 
  openDialog() {
    
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.quizForm.reset();
    this.selectedQuizId=null;
  }

 
  
  /*openUpdateDialog(id : string){
  this.selectedTestId = id;
  this.isDialogOpen = true;
  this.http.getById(id).subscribe((data:any)=>{
    const selectedTest =data;
    this.testForm.patchValue(selectedTest);

  })*/
  openUpdateDialog(quiz :any){
    this.selectedQuizId = quiz.id;
    this.currentMode ="truefalse";
    const selectedTest =quiz;
    this.trueFalseForm.patchValue(selectedTest);
  }

  openShowDialog(id :any){
    this.isShowDialog=true;
    this.http.getQuizById(id).subscribe((data:any)=>{
    this.quizShow=data;
    })
  }
  closeShowDialog() {
    this.isShowDialog= false;
  }
 
  get choices() {
    return this.multiChoiceForm.get('choices') as FormArray;
  }

  // Getter for easier access in the template
 

  addOption() {
    if (this.choices.length < 4) {
      this.choices.push(this.createOptionFormGroup());
    }
  }
  
  
  removeOptions(index: number) {
    this.choices.removeAt(index);
  }
  
 
  



  addQuiz(quizForm){
    if (quizForm.valid){
      const quiz: Quiz = {
        title: quizForm.get('title').value,
        question: quizForm.get('question').value,
        questionType: quizForm.get('questionType').value,
        choices: quizForm.get('choices').value,
        answers: quizForm.get('answers').value,
      };
    if(this.selectedQuizId){
      this.http.updateQuiz(this.selectedQuizId,quiz).subscribe(
        (response: HttpResponse<any>) => {
        console.log("Response:", response); // Log the entire response for debugging
        if (response.body && response.body.includes("quiz updated successfully")) {
          alert("quiz updated successfully");
          this.closeDialog();
          this.loadQuiz();
          // Redirect to a new page or perform any other actions after successful registration
        } else {
          alert("failed");
        }
      })
     }else{
      this.http.addQuiz(quiz).subscribe(
      (response: HttpResponse<any>) => {
        console.log("Response:", response); // Log the entire response for debugging
  
        if (response.body && response.body.includes("quiz added successfully")) {
          alert("quiz added successfully");
          this.closeDialog();
          this.loadQuiz();
          // Redirect to a new page or perform any other actions after successful registration
        } else {
          alert("failed");
        }
      },
      (error: HttpErrorResponse) => {
        console.error("Error:", error);
  
        if (error.status === 400 && error.error === "quiz existe") {
          alert("user already exists wi");
        } else {
          alert("An error occurred ");
        }
      }

    )}

  }
}
submit(formdata :any){
  console.log(formdata);
}
//---------------------------switching ---------------------------------------------
switchSection(sectionName: string) {
  this.currentSection = sectionName;
}
switchMode(modeName: string) {
  this.currentMode = modeName;
  this.closeDialog();
}

// -------------------------------Problem------------------------------------------ 
addProblem(problemForm){
  if(problemForm.valid){
    const problem= problemForm.value;
    this.http.addProblem(problem).subscribe(
      (response: HttpResponse<any>) => {
        console.log("Response:", response); // Log the entire response for debugging
        if (response.body && response.body.includes("Problem added successfully")) {
          this.toastr.showToas("added succefully")

          // Redirect to a new page or perform any other actions after successful registration
        } else {
          alert("failed");
        }
      })
    
  }
}
deleteProblem(id :any){
  this.http.deleteProblem(id).subscribe(
    ()=>{
      this.toastr.showToas("test deleted succefully succefully")
      this.loadProblems();
    }

  )
}
deleteTest(id :any){
  this.http.deleteTest(id).subscribe(
    ()=>{
      this.toastr.showToas("test deleted succefully succefully")
      this.loadTest();
    }

  )
}
openUpdateProblem(problem :any){
  this.selectedProblemId = problem.id;
  this.currentMode ="addProblem";
  const selectedTest =problem;
  this.problemForm.patchValue(selectedTest);
}
//-----------------------------------------True False --------------------------------
addTrueFalse(trueFalseForm){
  if(trueFalseForm.valid){
    const quiz= trueFalseForm.value;
    if(this.selectedQuizId){
      this.http.updateTrueFalse(this.selectedQuizId,quiz).subscribe(
        (response: HttpResponse<any>) => {
       console.log(response);
       this.toastr.showToas("updated succefully")
       this.currentMode="show";
       this.loadQuiz();
        },
        (error :HttpErrorResponse)=>{
          console.error('Error updating True/False question:', error);
  
        })
     }else{
    this.http.addTrueFalse(quiz).subscribe(
      (response: HttpResponse<any>) => {
        this.toastr.showToas("added succefully")
        this.currentMode="show";
        this.loadQuiz();
      },
      (error :HttpErrorResponse)=>{
        console.error('Error updating True/False question:', error);
      }
      
      )
      
    }
    
  }
}
openUpdateTrueFalse(quiz :any){
  this.selectedQuizId = quiz.id;
  this.currentMode ="truefalse";
  const selectedTest =quiz;
  this.trueFalseForm.patchValue(selectedTest);
}
openUpdateMultipleChoice(quiz :any){
  this.selectedQuizId = quiz.id;
  this.currentMode ="multiple";
  const selectedTest =quiz;
  this.multiChoiceForm.patchValue(selectedTest);
}
// -----------------------------------Multiple choice ---------------------------
addMulti(multipleChoiceForm){
  if(multipleChoiceForm.valid){
    const quiz= multipleChoiceForm.value;
    if(this.selectedQuizId){
      this.http.updateTrueFalse(this.selectedQuizId,quiz).subscribe(
        (response: HttpResponse<any>) => {
       console.log(response);
       alert("updated successfully");
       console.log(quiz);
       this.currentMode="show";
       this.loadQuiz();
        },
        (error :HttpErrorResponse)=>{
          console.error('Error updating True/False question:', error);
  
        })
     }else{
    this.http.addMultipleChoice(quiz).subscribe(
      (response: HttpResponse<any>) => {
        this.currentMode="show";
        this.loadQuiz();
      },
      (error :HttpErrorResponse)=>{
        console.error('Error updating True/False question:', error);
      }
      
      )
      
    }
    
  }
}
//----------------------- delete quiz --------------------------
deleteQuiz(id :any){
  this.http.deleteQuiz(id).subscribe(
    ()=>{
      alert("quiz deleted successfully")
      this.loadQuiz();
    }

  )
}
//---------------------load problems-------------------------------
loadProblems(){
  this.http.getAllProblem().subscribe((data:any)=>{
    this.problems=data;
    this.problemNumber=data.length;
  })
}
//--------------------+load quiz --------------------------------
loadQuiz() {
  this.http.getAllQuiz().subscribe((data: any) => {
    this.quizs = data;
    this.quizNumber=data.length;
  })
}
loadTest(){
  this.http.getAllTest().subscribe((data: any) => {
    this.tests = data;
  })
}
//  -------------------preview --------------------------------
openPreview() {
  // Open the preview component in a new window
  window.open('/preview', '_blank', 'width=800,height=600');
}


}
