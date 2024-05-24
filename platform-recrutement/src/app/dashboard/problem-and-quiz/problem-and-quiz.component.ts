import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { AdminService } from '../shared/services/admin.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Quiz } from 'src/app/shared/models/Quiz';

@Component({
  selector: 'app-problem-and-quiz',
  templateUrl: './problem-and-quiz.component.html',
  styleUrls: ['./problem-and-quiz.component.scss']
})
export class ProblemAndQuizComponent {
[x: string]: any;
  p:any =0;
  quizs: any[] = [];
  tests: any[] = [];
  quizNumber:number;
  problems:any[]=[];
  problemNumber:number;
  currentSection:String ="problems";
  currentMode:String ="show";
  quiz :Quiz;
  option :any[]=[];
  quizShow :Quiz;
  selectedQuizId :number = null;
  selectedProblemId :number = null;
  isDialogOpen: boolean = false;
  isShowDialog :boolean=false;
  quizForm :FormGroup;
  problemForm :FormGroup;
  trueFalseForm :FormGroup;
  multiChoiceForm :FormGroup;
  isSubmitted: boolean = false;
  isDeleteConfirmationModalOpen = false;
  isPreviewOpen:boolean=false;
  selectedItem:any;
  isQuiz:boolean;


  constructor(private http: AdminService ,private fb :FormBuilder,private router :Router,private toastr : ToastrService) {
    for(let i:number=1; i<=100;i++){
      this.quizs.push(i as never);
    }
  }
  ngOnInit() {
  
  this.trueFalseForm = this.fb.group({
    title: ['', [Validators.required]],
    question: ['',Validators.required],
    duration: ['',Validators.required],
    category: ['',Validators.required],
    points: ['',Validators.required],
    correctAnswer:['',Validators.required]
  })
   
 
   
    this.loadQuiz();
    this.loadProblems();
   


  }
 
  

 
 

  // Toggle editing mode for an option
 // Toggle editing mode for an option


  
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
 
  

  // Getter for easier access in the template
 

 
  
  
 
 
  



  
submit(formdata :any){
  console.log(formdata);
}
//---------------------------switching ---------------------------------------------
switchSection(sectionName: string) {
  this.currentSection = sectionName;
  this.p=0;
}
switchMode(modeName: string) {
  this.currentMode = modeName;
  this.closeDialog();
}

// -------------------------------Problem------------------------------------------ 





// -----------------------------------Multiple choice ---------------------------


//---------------------load problems-------------------------------
loadProblems(){
  this.isSubmitted = false;

  this.http.getAllProblem().subscribe((data:any)=>{
    this.problems=data;
    this.problemNumber=data.length;
  })
}
//--------------------+load quiz --------------------------------
loadQuiz() {
  this.isSubmitted = false;

  this.http.getAllQuiz().subscribe((data: any) => {
    this.quizs = data;
    this.quizNumber=data.length;
  })
}

//  -------------------preview --------------------------------
 
/////////confirm delete 
openDeleteConfirmationModal(id: number) {
 this.selectedProblemId =id;
  this.isDeleteConfirmationModalOpen = true;
}
onCloseModal(){
  this.isDeleteConfirmationModalOpen = false;

}
//------------------delete
deleteProblem(id :any){
  this.http.deleteProblem(id).subscribe(
    ()=>{
      this.toastr.showToas("test deleted succefully succefully")
      this.isDeleteConfirmationModalOpen = false;
      this.loadProblems();
    }

  )
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
handleDelete(id: number ) {
  if (this.currentSection === 'problems') {
    this.deleteProblem(id);
  } else if (this.currentSection === 'quizzes') {
    this.deleteQuiz(id);
  }
  // Close the modal after handling the delete action
  this.isDeleteConfirmationModalOpen = false;
}

openPreview(item:any,isQuiz:boolean){
  this.isPreviewOpen=true;
  this.selectedItem=item;
  this.isQuiz=isQuiz;

  console.log(this.isPreviewOpen,this.selectedItem,isQuiz)

}
closePreview(){
  this.isPreviewOpen=false;
}

}
