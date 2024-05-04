import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { timer } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { UserspaceService } from '../shared/services/userspace.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-user-code',
  templateUrl: './user-code.component.html',
  styleUrls: ['./user-code.component.scss']
})
export class UserCodeComponent {
  @Input() problem: any;
  @Output() formGroupValue = new EventEmitter<FormGroup>();

  problems:any[]=[];
  problemNumber:number;
  currentProblem :number=1;
  counter = 120; // Counter in seconds
  displayTime: string;
  output : [any];
  remainingMinutes: number = 0;
  remainingSeconds: number = 0;
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
  
  problemAnswerForm: FormGroup;

  query: string;

  ngOnInit() {
    console.log(this.query);
    this.onLanguageChange();
    this.updateCode();
    this.loadProblems();
    this.startTimer()

  }
  

  constructor(private http :UserspaceService,private fb: FormBuilder) {
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
      this.problemAnswerForm = this.fb.group({
        problem: [null],
        answerText: [''],
        points: [0],
      });
  }
  startTimer(): void {
    let totalSeconds = this.problem.duration *60// Set initial time (e.g., 60 seconds)

    const timer = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--; // Decrease remaining time every second
        this.remainingMinutes = Math.floor(totalSeconds / 60);
        this.remainingSeconds = totalSeconds % 60;
      } else {
        clearInterval(timer); // Stop the timer when time is up
        // Handle what should happen next (e.g., move to the next quiz)
      }
    }, 1000); // Timer runs every second (1000 milliseconds)
  }
  formatTime(time: number): string {
    return time < 10 ? '0' + time : time.toString();
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
    if (this.problem.language  === 'Java') {
      this.query = `// Java code example
      public class MyClass {
        public static void main(String[] args) {
          System.out.println("Hello, world!");
        }
      }`;
    } else if (this.problem.language  === 'Python') {
      this.query = `# Python code example
      print("Hello, world!")`;
    } else if (this.problem.language  === 'text/Mysql') {
      this.query = `SELECT SQL_NO_CACHE DISTINCT`;
    }  else if (this.problem.language  === 'JavaScript'){
      this.query = `// JavaScript code example
      function greet(name) {
          return("Hello, " + name + "!");
      }
      
      greet("World");`
    }
  }
  onLanguageChange() {
    this.codeMirrorOptions.mode = this.problem.language === 'Java' ? 'text/x-java' :
    this.problem.language === 'Python' ? 'text/x-python' :
    this.problem.language === 'Mysql' ? 'text/x-mysql' :
    this.problem.language === 'JavaScript' ? 'text/x-javascript' :
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
  emitFormGroupValue(problemAnswerForm) {
    const problem= problemAnswerForm.value;
    const transformedproblem = {id:this.problem.id};
    // Check if quiz.choices is defined before accessing its properties
    
    
    const finalFormGroup = { ...problem, problem:transformedproblem};
    console.log(finalFormGroup)
    this.formGroupValue.emit(finalFormGroup);

  }
}
