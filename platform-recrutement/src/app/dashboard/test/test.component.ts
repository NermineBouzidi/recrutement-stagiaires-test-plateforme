import { Component } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { SigninComponent } from 'src/app/signin/signin.component';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Test } from 'src/app/models/Test';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/Quiz';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  p:any =0;
  quizs: any[] = [];
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
  constructor(private http: AdminService ,private fb :FormBuilder,private router :Router) {
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
    options: this.fb.array([this.fb.control('')]),

  })
 
    this.quizForm = this.fb.group({
      title: ['', [Validators.required]],
      question: [''],
      duration: [''],
      points: [''],
      options: this.fb.array([this.fb.control('')]),
      correctOptionIndex : ['']
  
    //  description: [''],
    //  examples: this.fb.array([])
  });
    this.loadQuiz();
    this.loadProblems();


  }
  loadQuiz() {
    this.http.getAllQuiz().subscribe((data: any) => {
      this.quizs = data;
      this.quizNumber=data.length;
    })
  }

  loadProblems(){
    this.http.getAllProblem().subscribe((data:any)=>{
      this.problems=data;
      this.problemNumber=data.length;
    })
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
  deleteQuiz(id :any){
    this.http.deleteQuiz(id).subscribe(
      ()=>{
        alert("quiz deleted successfully")
        this.loadQuiz();
      }

    )
  }
  openPreview() {
    // Open the preview component in a new window
    window.open('/preview', '_blank', 'width=800,height=600');
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
    return this.quizForm.get('choices') as FormArray;
  }
  get options() {
    return this.multiChoiceForm.get('options') as FormArray;
  }

  // Getter for easier access in the template
  get answers() {
    return this.quizForm.get('answers') as FormArray;
  }

  addOption() {
    if (this.options.length < 4) {
      this.options.push(this.fb.control(''));
    }
  }
  
  
  removeOptions(index: number) {
    this.options.removeAt(index);
  }
  
  addAnswer() {
    const answerCount = this.answers.length;
    if (answerCount < this.choices.length ) {
      this.answers.push(this.fb.control(''));
    }
  }
  removeAnswer(index: number) {
    this.answers.removeAt(index);
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

switchSection(sectionName: string) {
  this.currentSection = sectionName;
}
switchMode(modeName: string) {
  this.currentMode = modeName;
  this.closeDialog();
}

addProblem(problemForm){
  if(problemForm.valid){
    const problem= problemForm.value;
    this.http.addProblem(problem).subscribe(
      (response: HttpResponse<any>) => {
        console.log("Response:", response); // Log the entire response for debugging
        if (response.body && response.body.includes("Problem added successfully")) {
        
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
      alert("test deleted successfully")
      this.loadProblems();
    }

  )
}
openUpdateProblem(problem :any){
  this.selectedProblemId = problem.id;
  this.currentMode ="addProblem";
  const selectedTest =problem;
  this.problemForm.patchValue(selectedTest);
}
addTrueFalse(trueFalseForm){
  if(trueFalseForm.valid){
    const quiz= trueFalseForm.value;
    if(this.selectedQuizId){
      this.http.updateTrueFalse(this.selectedQuizId,quiz).subscribe(
        (response: HttpResponse<any>) => {
       console.log(response);
       alert("updated successfully");
       this.currentMode="show";
       this.loadQuiz();
        },
        (error :HttpErrorResponse)=>{
          console.error('Error updating True/False question:', error);
  
        })
     }else{
    this.http.addTrueFalse(quiz).subscribe(
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
openUpdateTrueFalse(quiz :any){
  this.selectedQuizId = quiz.id;
  this.currentMode ="truefalse";
  const selectedTest =quiz;
  this.trueFalseForm.patchValue(selectedTest);
}
addMultipleChoice(quizForm){
  if(quizForm.valid){
    const quiz= quizForm.value;
    this.http.addMultipleChoice(quiz).subscribe(
      (response: HttpResponse<any>) => {
        console.log("Response:", response); // Log the entire response for debugging
        if (response.body && response.body.includes("quiz added successfully")) {
        
          // Redirect to a new page or perform any other actions after successful registration
        } else {
          alert("failed");
        }
      })
    
  }
}

}
