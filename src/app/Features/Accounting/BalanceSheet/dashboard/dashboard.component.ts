import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
// import { BalanceSheetReportsComponent } from '../balance-sheet-reports/balance-sheet-reports.component';
import {BsReportsComponent} from '../bs-reports/bs-reports.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showhide:any =[];
  constructor(public apiSrvc: ApiService, private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) {
    const data={
      title:'Balance Sheet',
      path1:'',
      path2:'',
      path3:''
}
  this.apiSrvc.SetHeaderData({
    obj: data
  })
   }

  ngOnInit(): void {
     this.apiSrvc.GetReports().subscribe((data) => {
      this.showhide =[];
      console.log(data.obj);
      const index = this.showhide.findIndex(i => i == data.obj)
      if (index >= 0) {
        if(data.obj =='M'){
          this.showhide=[]      
          console.log(this.showhide);
        }
        else{
          this.showhide.splice(index, 1)  
          console.log(this.showhide);
         }
      }
      else {
        this.showhide.push(data.obj)
        console.log(this.showhide);
      }
    })
  }
  expandandCollapse(e){
   
    const index = this.showhide.findIndex(i => i == e)
    if (index >= 0) {
      if(e=='M'){
        this.showhide=[]      
      }
      else{
        this.showhide.splice(index, 1)  
       }
    }
    else {
    
      this.showhide.push(e)
    }
  }

  openMenu(){
    const modalRef = this.ngbmodal.open(BsReportsComponent,{
      size:'xl',
      backdrop: "static",
    });
    modalRef.componentInstance.Parentcomponent = 'BS';
    
  }

   

}
