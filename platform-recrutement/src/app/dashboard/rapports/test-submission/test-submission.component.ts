import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../shared/services/admin.service';

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
  constructor(private route: ActivatedRoute,private http :AdminService) { }

  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('user');
    this.loadAnswers(this.user);
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
}
