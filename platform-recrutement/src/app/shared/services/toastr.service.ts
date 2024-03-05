import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  status :BehaviorSubject <any> = new BehaviorSubject<any>(null);
 timer: any;

  constructor() { }

  showToas(msg :string){
    this.status.next(msg);
   if (this.timer){
    clearTimeout(this.timer)
   }

    this.timer = window.setTimeout(()=> {
      this.status.next(null);
    },4000)
  }
}
