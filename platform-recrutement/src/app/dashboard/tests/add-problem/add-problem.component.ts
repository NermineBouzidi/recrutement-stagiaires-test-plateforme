import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import {  FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { AdminService } from '../../shared/services/admin.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

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
  selectedProblemId: string = null;

  constructor(private http: AdminService ,private fb :FormBuilder,private router :Router,private toastr : ToastrService,private cdr: ChangeDetectorRef,private route: ActivatedRoute){}
  ngOnInit() {
    this.problemForm = this.fb.group({
      title: ['', [Validators.required]],
      difficulty: ['', [Validators.required]],
      language: ['',Validators.required],
      description:  ['',Validators.required],
      category: ['', [Validators.required]],
      duration:  ['',Validators.required ],
      points:  ['',Validators.required]
  });
  this.selectedProblemId = this.route.snapshot.paramMap.get('problem');
  if (this.selectedProblemId) {
    this.getProblemById(this.selectedProblemId);
  }
}
  
  addProblem(){
    this.isSubmitted = true;
    if(this.problemForm.valid){
      const problem= this.problemForm.value;
      console.log("Problem being sent:", problem); // Log data being sent
        if (this.selectedProblemId) {
          this.http.updateProblem(this.selectedProblemId, problem).subscribe(
            (response: HttpResponse<any>) => {
              this.toastr.showToas("updated successfully");
              this.router.navigateByUrl("/dashboard/problem-quiz");
            },
            (error: HttpErrorResponse) => {
              console.error('Error updating quiz:', error);
            }
          );
        } else {
          this.http.addProblem(problem).subscribe(
            (response: HttpResponse<any>) => {
              console.log("Response:", response); // Log the entire response for debugging
              if (response.body && response.body.includes("Problem added successfully")) {
                this.toastr.showToas("added succefully")
                this.router.navigateByUrl("/dashboard/problem-quiz");
                // Redirect to a new page or perform any other actions after successful registration
              } else {
                alert("failed");
              }
            })
        }
      }
      
      
    }
  
  getProblemById(problemId: any) {
    this.http.getProblemById(problemId).subscribe((data: any) => {
      this.problemForm.patchValue(data); // Patch form with quiz data
    });
  }
 

}
