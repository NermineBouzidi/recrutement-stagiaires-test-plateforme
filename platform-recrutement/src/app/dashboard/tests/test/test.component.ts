import { Component } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { SigninComponent } from 'src/app/signin/signin.component';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Test } from 'src/app/shared/models/Test';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/shared/models/Quiz';
import { ToastrService } from 'src/app/shared/services/toastr.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  p:any =0;
  tests: any[] = [];
  currentMode:String ="show";
  isDialogOpen: boolean = false;
  test :any;
  isDeleteConfirmationModalOpen = false;
  selectedTest :any =null;
  constructor(private http: AdminService ,private fb :FormBuilder,private router :Router,private toastr : ToastrService) {
  
  }
  ngOnInit() {
    this.loadTest();
  }


 ///-----function to open view model
  openDialog(test) {
    this.test=test;
    this.isDialogOpen = true;
  }
//------------function to close view model----------
  closeDialog() {
      this.isDialogOpen = false;
  }

 
  
  /*openUpdateDialog(id : string){
  this.selectedTestId = id;
  this.isDialogOpen = true;
  this.http.getById(id).subscribe((data:any)=>{
    const selectedTest =data;
    this.testForm.patchValue(selectedTest);

  })*/
 

  
 
  



 




//--------delete test ---------------------
deleteTest(id :any){
  this.http.deleteTest(id).subscribe(
    ()=>{
      this.toastr.showToas("test deleted succefully succefully")
      this.isDeleteConfirmationModalOpen = false;

      this.loadTest();
    }

  )
}

//---------------load tests -------------------------------
loadTest(){
  this.http.getAllTest().subscribe((data: any) => {
    this.tests = data;
  })
}
//  -------------------function to open delete confirmation model---------------
openDeleteConfirmationModal(test:any) {
  this.selectedTest =test;
   this.isDeleteConfirmationModalOpen = true;
 }
 closeDeleteConfirmationModal(){
   this.isDeleteConfirmationModalOpen = false;
 
 }

 

}
