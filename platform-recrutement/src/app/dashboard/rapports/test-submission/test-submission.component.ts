import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../shared/services/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    problemAnswerForm: FormGroup;

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
  constructor(private route: ActivatedRoute,private http :AdminService,private fb: FormBuilder) { }

  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('user');
    this.loadAnswers(this.user);
    this.problemAnswerForm = this.fb.group({
      problem: [null],
      answerText: [''],
      points: [0],
    });
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
}

