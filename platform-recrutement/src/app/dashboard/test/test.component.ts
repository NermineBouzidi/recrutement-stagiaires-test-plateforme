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
  data: any[] = [];
  quiz :Quiz;
  quizShow :Quiz;
  selectedQuizId :string = null;
  isDialogOpen: boolean = false;
  isShowDialog :boolean=false;
  quizForm :FormGroup
  constructor(private http: AdminService ,private fb :FormBuilder,private router :Router) {
    for(let i:number=1; i<=100;i++){
      this.data.push(i as never);
    }
  }
  ngOnInit() {
    this.quizForm = this.fb.group({
      title: ['', [Validators.required]],
      question: [''],
      questionType: [''],
      choices: this.fb.array([this.fb.control('')]),
      answers: this.fb.array([this.fb.control('')]),
  
    //  description: [''],
    //  examples: this.fb.array([])
  });
    this.loadQuiz()
   
  }
  loadQuiz() {
    this.http.getAllQuiz().subscribe((data: any) => {
      this.data = data;
    });
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
  /*openUpdateDialog(id : string){
  this.selectedTestId = id;
  this.isDialogOpen = true;
  this.http.getById(id).subscribe((data:any)=>{
    const selectedTest =data;
    this.testForm.patchValue(selectedTest);

  })*/
  openUpdateDialog(quiz :any){
    this.selectedQuizId = quiz.id;
    this.isDialogOpen = true;
      const selectedTest =quiz;
      this.quizForm.patchValue(selectedTest);
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

  // Getter for easier access in the template
  get answers() {
    return this.quizForm.get('answers') as FormArray;
  }

  addChoice() {
    if (this.choices.length < 3){
      this.choices.push(this.fb.control(''));
    }
  }
  
  removeChoice(index: number) {
    this.choices.removeAt(index);
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
}
