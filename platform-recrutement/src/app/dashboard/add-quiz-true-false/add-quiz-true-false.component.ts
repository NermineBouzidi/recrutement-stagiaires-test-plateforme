import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { AdminService } from '../shared/services/admin.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-quiz-true-false',
  templateUrl: './add-quiz-true-false.component.html',
  styleUrls: ['./add-quiz-true-false.component.scss']
})
export class AddQuizTrueFalseComponent {
  trueFalseForm :FormGroup;
  selectedQuizId: string = null;
  isSubmitted: boolean = false;
  constructor(
    private http: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.trueFalseForm = this.fb.group({
      title: ['', [Validators.required]],
      question: ['', Validators.required],
      difficulty: ['', [Validators.required]],
      duration: ['', Validators.required],
      category: ['', Validators.required],
      points: ['', Validators.required],
      correctAnswer:['',Validators.required]
    })

    this.selectedQuizId = this.route.snapshot.paramMap.get('quiz');
    if (this.selectedQuizId) {
      this.getQuizById(this.selectedQuizId);
    }
  }
  onSubmit(multipleChoiceForm) {
    this.isSubmitted = true;
    if (multipleChoiceForm.valid) {
      const quiz = multipleChoiceForm.value;
      if (this.selectedQuizId) {
        this.http.updateTrueFalse(this.selectedQuizId, quiz).subscribe(
          (response: HttpResponse<any>) => {
            this.toastr.showToas("updated successfully");
            this.router.navigateByUrl("/dashboard/problem-quiz");
          },
          (error: HttpErrorResponse) => {
            console.error('Error updating quiz:', error);
          }
        );
      } else {
        this.http.addTrueFalse(quiz).subscribe(
          (response: HttpResponse<any>) => {
            this.toastr.showToas("added successfully");
            this.router.navigateByUrl("/dashboard/problem-quiz");
          },
          (error: HttpErrorResponse) => {
            console.error('Error adding quiz:', error);
          }
        );
      }
    }
  }

  getQuizById(quizId: any) {
    this.http.getQuizById(quizId).subscribe((data: any) => {
      this.trueFalseForm.patchValue(data); // Patch form with quiz data

    });
  }
}
