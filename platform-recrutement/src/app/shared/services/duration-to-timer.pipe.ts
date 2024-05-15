import { Pipe, PipeTransform } from '@angular/core';
import { interval, map, takeWhile, shareReplay, tap, timer } from 'rxjs';

@Pipe({
  name: 'durationToTimer'
})
export class DurationToTimerPipe implements PipeTransform {

  transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = this.padZero(hours);
    const formattedMinutes = this.padZero(remainingMinutes);
    return `${formattedHours}:${formattedMinutes}`;
  }

  private padZero(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }
}