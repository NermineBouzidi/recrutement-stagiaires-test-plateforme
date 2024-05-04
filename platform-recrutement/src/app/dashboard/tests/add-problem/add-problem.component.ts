import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import {  FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { AdminService } from '../../shared/services/admin.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-problem',
  templateUrl: './add-problem.component.html',
  styleUrls: ['./add-problem.component.scss'],


})
export class AddProblemComponent {
  problemForm :FormGroup;
  isSubmitted: boolean = false;
  dropdownList = [];
  selectedItems = [];
  
  constructor(private http: AdminService ,private fb :FormBuilder,private router :Router,private toastr : ToastrService,private cdr: ChangeDetectorRef,private route: ActivatedRoute){}
  ngOnInit() {
    this.problemForm = this.fb.group({
      title: ['', [Validators.required]],
      language: ['',Validators.required],
      description:  ['',Validators.required],
      category: ['', [Validators.required]],
      input:  ['',Validators.required],
      output:  ['',Validators.required],
      duration:  ['',Validators.required ],
      points:  ['',Validators.required]
  });
}
  
  addProblem(){
    this.isSubmitted = true;
    if(this.problemForm.valid){
      const problem= this.problemForm.value;
      console.log("Problem being sent:", problem); // Log data being sent

      
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

 

}
