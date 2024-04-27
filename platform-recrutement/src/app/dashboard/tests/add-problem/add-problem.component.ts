import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { AdminService } from '../../shared/services/admin.service';
import { HttpResponse } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-problem',
  templateUrl: './add-problem.component.html',
  styleUrls: ['./add-problem.component.scss'],
  encapsulation: ViewEncapsulation.None // Add this line


})
export class AddProblemComponent {
  problemForm :FormGroup;
  isSubmitted: boolean = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings
  constructor(private http: AdminService ,private fb :FormBuilder,private router :Router,private toastr : ToastrService,private cdr: ChangeDetectorRef,private route: ActivatedRoute){}
  ngOnInit() {
    this.problemForm = this.fb.group({
      title: ['', [Validators.required]],
      language: ['',Validators.required],
      description:  ['',Validators.required],
      category: ['', [Validators.required]],
      input:  ['',Validators.required],
      output:  ['',Validators.required],
      duration:  ['',Validators.required ,Validators.minLength(2),Validators.maxLength(20)],
      points:  ['',Validators.required]
  });
  this.dropdownList = [
    { item_id: 1, item_text: 'Web Developement' },
    { item_id: 2, item_text: 'Bangaluru' },
    { item_id: 3, item_text: 'Pune' },
  
  ];

  this.dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
  };
  }
  addProblem(problemForm :FormGroup){
    this.isSubmitted = true;
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

 
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
function durationValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const duration = control.value;
    if (duration === '' || duration === null) {
      return null; // Empty value handled by required validator
    } else if (isNaN(duration) || duration < 2 || duration > 20) {
      return { duration: { min: 2, max: 20 } }; // Custom error object
    }
    return null;
  };
}