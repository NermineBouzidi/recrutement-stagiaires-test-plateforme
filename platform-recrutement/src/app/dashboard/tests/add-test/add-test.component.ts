import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent {
  currentMode:String ="type";

  testForm :FormGroup;
  constructor(private http: AdminService ,private fb :FormBuilder){}
  ngOnInit() {
    this.testForm = this.fb.group({
      category: ['', [Validators.required]],
      difficultyLevel: [''],
      passingPercentage: [''],
      totalDuration: [''],
      totalPoints: [''],
  });
}
switchMode(modeName: string) {
  this.currentMode = modeName;
}
}
