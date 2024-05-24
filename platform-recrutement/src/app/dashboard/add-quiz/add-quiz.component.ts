import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent {
  multiChoiceForm: FormGroup;
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
    this.multiChoiceForm = this.fb.group({
      title: ['', [Validators.required]],
      question: ['', Validators.required],
      difficulty: ['', [Validators.required]],
      duration: ['', Validators.required],
      category: ['', Validators.required],
      points: ['', Validators.required],
      choices: this.fb.array([this.createOptionFormGroup()]), // Initialize with an empty option
    });

    this.selectedQuizId = this.route.snapshot.paramMap.get('quiz');
    if (this.selectedQuizId) {
      this.getQuizById(this.selectedQuizId);
    }
  }

  createOptionFormGroup(): FormGroup {
    return this.fb.group({
      text: [''], // Initialize as an empty FormControl
      correct: [false]
    });
  }

  get choices() {
    return this.multiChoiceForm.get('choices') as FormArray;
  }

  removeOption(index: number) {
    this.choices.removeAt(index);
  }

  addOption() {
    if (this.choices.length < 4) {
      this.choices.push(this.createOptionFormGroup());
    }
  }

  submit(formdata: any) {
    console.log(formdata);
  }

  onSubmit(multipleChoiceForm) {
    this.isSubmitted = true;
    if (multipleChoiceForm.valid) {
      const quiz = multipleChoiceForm.value;
      if (this.selectedQuizId) {
        this.http.updateQuiz(this.selectedQuizId, quiz).subscribe(
          (response: HttpResponse<any>) => {
            this.toastr.showToas("updated successfully");
            this.router.navigateByUrl("/dashboard/problem-quiz");
          },
          (error: HttpErrorResponse) => {
            console.error('Error updating quiz:', error);
          }
        );
      } else {
        this.http.addMultipleChoice(quiz).subscribe(
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
      this.multiChoiceForm.patchValue(data); // Patch form with quiz data

      this.choices.clear(); // Clear existing choices
      data.choices.forEach(choice => {
        this.choices.push(this.fb.group({
          text: [choice.text],
          correct: [choice.correct]
        }));
      });
    });
  }
}
