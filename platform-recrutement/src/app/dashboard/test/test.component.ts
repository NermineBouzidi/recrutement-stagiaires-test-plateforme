import { Component } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent  {
  data :any []=[];
  constructor (private http : AdminService){}
  ngOnInit(){
    this.loadTest()
  }
loadTest(){
  this.http.getAll().subscribe(
      (data : any) => {
          this.data=data;
  })
}
}
