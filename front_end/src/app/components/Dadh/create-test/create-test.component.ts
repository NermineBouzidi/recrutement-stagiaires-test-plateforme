import { HttpClient ,HttpResponse,HttpErrorResponse, HttpClientModule} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,HttpClientModule],
  templateUrl: './create-test.component.html',
  styleUrl: './create-test.component.css'
})
export class CreateTestComponent {
  testForm :FormGroup;
  constructor(private http :HttpClient ,private fb :FormBuilder ,private router :Router ){
    this.testForm =this.fb.group(
      {title:new FormControl("",[Validators.required]),
      description:new FormControl("",[Validators.required]),
      category: new FormControl("",[Validators.required]),
      difficulty: new FormControl("",[Validators.required ])
    }
    )
  }
  isSubmitted =false;
  testExist=false;

  onSubmit(){
    this.isSubmitted=true;
    if (this.testForm.valid){
    const test :Test ={
      title :this.testForm.get('title')?.value,
      description: this.testForm.get('description')?.value,
      category :this.testForm.get('category')?.value,
      difficulty :this.testForm.get('difficulty')?.value,

  }
      this.http.post("http://localhost:8080/api/test/addTest", test, { observe: 'response' ,responseType: 'text'}).subscribe(
        (response: HttpResponse<any>) => {
          console.log("Response:", response); // Log the entire response for debugging
    
          if (response.body && response.body.includes("test added successfully")) {
            alert("test added successfully");
            this.router.navigateByUrl("/dashboard/tests");
            // Redirect to a new page or perform any other actions after successful registration
          } else {
            alert("failed");
          }
        },
        (error: HttpErrorResponse) => {
          console.error("Error:", error);
    
          if (error.status === 400 && error.error === "test existe") {
            this.testExist=true;
            // alert("user already exists wi");
          } else {
            alert("An error occurred ");
          }
        }
        
      ) }

  }


}
export class Test{
  title:String ;
  description:String ;
  category:String;
  difficulty:String;
   
    constructor(){
      this.title="";
      this.description="";
     this.category="";
     this.difficulty="";
    
    }
}
