import { Component, Input } from '@angular/core';
import { ToastrService } from '../../../services/toastr.service';
import { mergeScan } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  showToast : boolean =false;
  message : string ;
  constructor( private toastr :ToastrService ){

  }
  ngOnInit(){
        this.toastr.status.subscribe((msg : string)=>{
          if (msg == null){
            this.showToast=false;
          }else {
            this.showToast=true;
            this.message=msg;
          }
        })
  }
}
