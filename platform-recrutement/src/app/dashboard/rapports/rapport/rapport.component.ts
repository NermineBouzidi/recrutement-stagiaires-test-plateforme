import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent {
  rapportsNumber :number;
  p:any =0;
  data: any[] = [];
  constructor (private http: AdminService, private datePipe: DatePipe, private toast :ToastrService ){}

  ngOnInit(){
    this.loadRapports(); 
 }

 loadRapports(){
   this.http.getAllRapport().subscribe(
     (data : any) => {
         this.data=data
         this.rapportsNumber= this.data.length;
 })
 } 
 formatDate(date: any): string {
  return this.datePipe.transform(date, 'MMMM d, y');
}
getInitials(firstName: String, lastName: String): string {
  return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
}
acceptUser(id : any){
  this.http.acceptCandidat(id).subscribe(
    ()=>{
      alert("email send suuccesssfully")
      this.loadRapports();

    }
  )
}
rejectUser(id : any){
  this.http.rejectCandidat(id).subscribe(
    ()=>{
      alert("email send suuccesssfully")
      this.loadRapports();

    }
  )
}
}
