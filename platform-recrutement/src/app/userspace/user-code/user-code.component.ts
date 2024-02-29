import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-code',
  templateUrl: './user-code.component.html',
  styleUrls: ['./user-code.component.scss']
})
export class UserCodeComponent {
  counter = 120; // Counter in seconds
  displayTime: string;
  selectedLanguage: string ="text/x-java"; // Default language

  codeMirrorOptions: any = {
    mode: "text/x-java",
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    lineWrapping: false,
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


  }

  constructor() {
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
    }  else if (this.selectedLanguage === 'text/javascript'){
      this.query = `// JavaScript code example
      function greet(name) {
          console.log("Hello, " + name + "!");
      }
      
      greet("World");`
    }
  }
  onLanguageChange() {
    this.codeMirrorOptions.mode = this.selectedLanguage;
    this.updateCode()
  }
  
}
