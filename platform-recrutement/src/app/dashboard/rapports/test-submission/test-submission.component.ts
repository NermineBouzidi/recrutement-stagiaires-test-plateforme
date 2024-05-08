import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../shared/services/admin.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-test-submission',
  templateUrl: './test-submission.component.html',
  styleUrls: ['./test-submission.component.scss']
})
export class TestSubmissionComponent {
  userId: number; // Declare a variable to store the user ID
    user:any;
    data: any[] = [];
    quizzes: any[];
    problems: any[];
    updateForm: FormGroup;
    updatedPoints: { [key: string]: number } = {};

    currentSection:String ="quizzes";
    codeMirrorOptions: any = {
      mode: "text/x-java",
      theme:"dracula",
      indentWithTabs: true,
      smartIndent: true,
      lineNumbers: true,
      lineWrapping: true,
      extraKeys: { "Ctrl-Space": "autocomplete" },
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      autoCloseBrackets: true,
      matchBrackets: true,
      lint: true,
  
    };
  constructor(private route: ActivatedRoute,private http :AdminService,private fb: FormBuilder,private toastr : ToastrService,private router :Router) { }

  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('user');
    this.loadAnswers(this.user);
    this.updateForm = this.fb.group({
      problemsArray: this.fb.array([])
    });
  }
  get problemsArray() {
    return this.updateForm.get('problemsArray')  as FormArray;
  }

  loadAnswers(testSubmissionId :any){
    this.http.getAllAnswers(testSubmissionId).subscribe ((data : any) => {
      this.data=data;
      this.quizzes= data.quizAnswers;
      this.problems=data.problemAnswers;
})
  }
  switchSection(sectionName: string) {
    this.currentSection = sectionName;
  }
  checkAnswers(choices: string[], answers: string[]): { choice: string, color: string }[] {
    const results = [];
    for (let i = 0; i < choices.length; i++) {
      const choice = choices[i].toLowerCase();
      const answer = answers[i].toLowerCase();
      let color = 'black';
      if (choice === answer) {
        color = 'green';
      } else {
        color = 'red';
      }
      results.push({ choice, color });
    }
    return results;
  }
  displayChoices(choices: any[], answers: any[]) {
    console.log("Choices:");
  
    for (const choice of choices) {
      let color = "black"; // Default color for non-matching choices
  
      // Check if the choice is present in multipleChoiceAnswers
      const matchingAnswer = answers.find(answer => answer.id === choice.id);
  
      if (matchingAnswer) {
        color = matchingAnswer.correct ? "green" : "red"; // Green for correct, red for incorrect
      }
  
      console.log(`  - ${choice.text} (${color})`);
    }
  
    // Find the correct answer from choices (if not present in multipleChoiceAnswers)
    const correctAnswer = choices.find(choice => choice.correct);
    if (correctAnswer && !answers.some(answer => answer.id === correctAnswer.id)) {
      console.log(`Correct Answer (not in list): ${correctAnswer.text} (green)`);
    }
  }
  oppositeAnswer(answer: boolean)  {
    return !answer;
  }

  submitPoints(){
    for (const answer of this.problems) {
      // Convert answer.id to string (assuming it's a number)
      const idString = answer.id.toString();
      this.updatedPoints[idString] = answer.points;
    }
    
    console.log(this.updatedPoints)
    this.http.setPoints(this.user,this.updatedPoints).subscribe((response: HttpResponse<any>) => {
      console.log("Response:", response); // Log the entire response for debugging
      this.toastr.showToas("Points submitted successfully!"); // Use toastr.success for success
      this.router.navigateByUrl("/dashboard/rapport");

    },
    (error: HttpErrorResponse) => {
      console.error("Error submitting points:", error); // Log the error for debugging
      this.toastr.showToas("Failed to submit points. Please try again later."); // Informative error message
    }
  );
}

getColor(choice: any ,userAnswers): string {
  const matchingAnswer = userAnswers.find(answer => answer.id === choice.id);
  if (matchingAnswer) {
    return matchingAnswer.correct ? 'text-green-500 bg-green-50 hover:bg-green-100' : 'text-red-500 bg-red-50 hover:bg-red-100';
  }
  return 'white'; // Default color for unselected choices
}
}

