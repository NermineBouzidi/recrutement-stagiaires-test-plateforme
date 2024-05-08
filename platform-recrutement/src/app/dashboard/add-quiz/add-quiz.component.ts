import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent {
  multiChoiceForm :FormGroup;
  selectedQuizId :string = null;
  isSubmitted: boolean = false;

  constructor(private http: AdminService ,private fb :FormBuilder,private router :Router,private toastr : ToastrService) {}
  ngOnInit() {
    this.multiChoiceForm = this.fb.group({
      title: ['', [Validators.required]],
      question: ['', Validators.required],
      difficulty: ['', [Validators.required]],
      duration: ['', Validators.required],
      category: ['', Validators.required],
      points: ['', Validators.required],
      choices: this.fb.array([this.createOptionFormGroup()]), // Initialize with an empty option
    });
    
  }
  
 createOptionFormGroup(): FormGroup {
  return this.fb.group({
    text: [''], // Initialize as an empty FormControl
    correct: [false]
  });
}

get choices() {
  return this.multiChoiceForm.get('choices') as FormArray;
}

// Getter for easier access in the template

removeOption(index: number) {
  this.choices.removeAt(index);
}

addOption() {
  if (this.choices.length < 4) {
    this.choices.push(this.createOptionFormGroup());
  }
  console.log(this.choices)
}


submit(formdata :any){
  console.log(formdata);
}

addMulti(multipleChoiceForm){
  this.isSubmitted = true;
  if(multipleChoiceForm.valid){
    const quiz= multipleChoiceForm.value;
    if(this.selectedQuizId){
      this.http.updateTrueFalse(this.selectedQuizId,quiz).subscribe(
        (response: HttpResponse<any>) => {
       console.log(response);
       alert("updated successfully");
     
        },
        (error :HttpErrorResponse)=>{
          console.error('Error updating True/False question:', error);
  
        })
     }else{
    this.http.addMultipleChoice(quiz).subscribe(
      (response: HttpResponse<any>) => {
        
      },
      (error :HttpErrorResponse)=>{
        console.error('Error updating True/False question:', error);
      }
      
      )
      
    }
    
  }
}
}
