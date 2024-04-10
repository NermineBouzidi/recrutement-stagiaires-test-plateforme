import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { timer } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { UserspaceService } from '../shared/services/userspace.service';
@Component({
  selector: 'app-user-code',
  templateUrl: './user-code.component.html',
  styleUrls: ['./user-code.component.scss']
})
export class UserCodeComponent {
  @Input() problem: any;

  problems:any[]=[];
  problemNumber:number;
  currentProblem :number=1;
  counter = 120; // Counter in seconds
  displayTime: string;
  output : [any];
  selectedLanguage: string ; // Default language
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
  

  query: string;

  ngOnInit() {
    console.log(this.query);
    this.onLanguageChange();
    this.updateCode();
    this.loadProblems();

  }
  

  constructor(private http :UserspaceService) {
    timer(1000, 1000) // Initial delay 1 second and interval countdown also 1 second
      .pipe(
        takeWhile(() => this.counter > 0),
        tap(() => {
          this.counter--;
          this.displayTime = this.secondsToHHMMSS(this.counter);
        })
      )
      .subscribe(() => {
        // Add your more code
      });
  }
  private minutesToMMSS(minutes: number): string {
    if (isNaN(minutes) || minutes < 0) {
      return '00:00'; // Handle invalid or negative input
    }
  
    const totalSeconds = minutes * 60; // Convert minutes to seconds
    const remainingSeconds = totalSeconds % 60;
  
    const minutesStr = minutes.toString().padStart(2, '0'); // Pad with leading zeros
    const secondsStr = remainingSeconds.toString().padStart(2, '0'); // Pad with leading zeros
  
    return `${minutesStr}:${secondsStr}`;
  }
  
  private secondsToHHMMSS(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hoursStr = hours < 10 ? '0' + hours : hours;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secondsStr = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }
  updateCode() {
    if (this.selectedLanguage === 'text/x-java') {
      this.query = `// Java code example
      public class MyClass {
        public static void main(String[] args) {
          System.out.println("Hello, world!");
        }
      }`;
    } else if (this.selectedLanguage === 'text/x-python') {
      this.query = `# Python code example
      print("Hello, world!")`;
    } else if (this.selectedLanguage === 'text/x-mysql') {
      this.query = `SELECT SQL_NO_CACHE DISTINCT`;
    }  else if (this.selectedLanguage === 'javascript'){
      this.query = `// JavaScript code example
      function greet(name) {
          return("Hello, " + name + "!");
      }
      
      greet("World");`
    }
  }
  onLanguageChange() {
    this.codeMirrorOptions.mode = this.selectedLanguage === 'Java' ? 'text/x-java' :
    this.selectedLanguage === 'Python' ? 'text/x-python' :
    this.selectedLanguage === 'Mysql' ? 'text/x-mysql' :
    this.selectedLanguage === 'JavaScript' ? 'text/x-javascript' :
    'text/plain'; // Default mode for unknown languages    this.updateCode()
    this.updateCode();
  }

  Submit(){
    const code = this.query;
    this.output = eval(code);

    console.log(this.output);
    
  }
  loadProblems(){
    this.http.getAllProblem().subscribe((data:any)=>{
      this.problems=data;
      this.problemNumber=data.length;
      this.selectedLanguage = this.problems[0].language;
      this.onLanguageChange();

    })
  }
  nextProblem() {
    if (this.currentProblem < this.problems.length ) {
      this.selectedLanguage = this.problems[this.currentProblem].language;
      this.onLanguageChange();
      this.currentProblem++;
    }
  }
}
