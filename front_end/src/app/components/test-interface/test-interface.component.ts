import { Component } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-interface',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './test-interface.component.html',
  styleUrl: './test-interface.component.css'
})
export class TestInterfaceComponent {
  constructor(private fb: FormBuilder) {
 
  }
  userF :FormGroup =this.fb.group(
    {email: new FormControl("",[Validators.required,Validators.email]),
    age: new FormControl("",[Validators.required])
  }

  );
  
onSubmit (){
  console.log(this.userF.value ,this.userF.valid);
}
}
