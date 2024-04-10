import { Pipe, PipeTransform } from '@angular/core';
import { interval, map, takeWhile, shareReplay, tap, timer } from 'rxjs';

@Pipe({
  name: 'durationToTimer'
})
export class DurationToTimerPipe implements PipeTransform {

  transform(minutes: number): any {
    if (isNaN(minutes) || minutes < 0) {
      return '00:00'; // Handle invalid or negative input
    }
  
    const totalSeconds = minutes * 60; // Convert minutes to seconds
    const remainingSeconds = totalSeconds % 60;
  
    const minutesStr = minutes.toString().padStart(2, '0'); // Pad with leading zeros
    const secondsStr = remainingSeconds.toString().padStart(2, '0'); // Pad with leading zeros
  
    return `${minutesStr}:${secondsStr}`;
}

}