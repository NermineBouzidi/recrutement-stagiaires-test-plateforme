import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  remainingMinutes: number = 0;
  remainingSeconds: number = 0;
  ngOnInit(): void {
    this.startTimer();
  }
  startTimer(): void {
    let totalSeconds = 60; // Set initial time (e.g., 60 seconds)

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
  
  
 
}

