import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-submission',
  templateUrl: './test-submission.component.html',
  styleUrls: ['./test-submission.component.scss']
})
export class TestSubmissionComponent {
  userId: number; // Declare a variable to store the user ID
    user:any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('user');
  }
}
