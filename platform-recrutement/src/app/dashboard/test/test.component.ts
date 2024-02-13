import { Component } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';
import { SigninComponent } from 'src/app/signin/signin.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Test } from 'src/app/models/Test';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  data: any[] = [];
  test :Test;
  testShow :Test;
  selectedTestId :string = null;
  isDialogOpen: boolean = false;
  isShowDialog :boolean=false;
  testForm :FormGroup
  constructor(private http: AdminService ,private fb :FormBuilder,private router :Router) {}
  ngOnInit() {
    this.testForm=this.fb.group(
      {title:new FormControl("",[Validators.required]),
      description:new FormControl("",[Validators.required]),
      category: new FormControl("",[Validators.required]),
      difficulty: new FormControl("",[Validators.required ])}
    )
    this.loadTest();
    
  }
  loadTest() {
    this.http.getAll().subscribe((data: any) => {
      this.data = data;
    });
  }
  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.testForm.reset();
    this.selectedTestId=null;

  }
  deleteTest(id :any){
    this.http.delete(id).subscribe(
      ()=>{
        alert("test deleted successfully")
        this.loadTest();
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
  openUpdateDialog(test :any){
    this.selectedTestId = test.id;
    this.isDialogOpen = true;
      const selectedTest =test;
      this.testForm.patchValue(selectedTest);
  }
  openShowDialog(id :any){
    this.isShowDialog=true;
    this.http.getById(id).subscribe((data:any)=>{
    this.testShow=data;
    })
  }
  closeShowDialog() {
    this.isShowDialog= false;
  }

  addTest(){
    if (this.testForm.valid){
      const test :Test ={
        title :this.testForm.get('title')?.value,
        description: this.testForm.get('description')?.value,
        category :this.testForm.get('category')?.value,
        difficulty :this.testForm.get('difficulty')?.value,
        id:"",
    }
    if(this.selectedTestId){
      this.http.update(this.selectedTestId,test).subscribe(
        (response: HttpResponse<any>) => {
        console.log("Response:", response); // Log the entire response for debugging
  
        if (response.body && response.body.includes("test updated successfully")) {
          alert("test updated successfully");
          this.closeDialog();
          this.loadTest();
          // Redirect to a new page or perform any other actions after successful registration
        } else {
          alert("failed");
        }
      })
     }else{
    this.http.add(test).subscribe(
      (response: HttpResponse<any>) => {
        console.log("Response:", response); // Log the entire response for debugging
  
        if (response.body && response.body.includes("test added successfully")) {
          alert("test added successfully");
          this.closeDialog();
          this.loadTest();
          // Redirect to a new page or perform any other actions after successful registration
        } else {
          alert("failed");
        }
      },
      (error: HttpErrorResponse) => {
        console.error("Error:", error);
  
        if (error.status === 400 && error.error === "test existe") {
          alert("user already exists wi");
        } else {
          alert("An error occurred ");
        }
      }

    )}

  }
}
}
