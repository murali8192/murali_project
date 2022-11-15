import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/Core/Providers/ApiService/api.service';

@Component({
  selector: 'app-loyality-comparison',
  templateUrl: './loyality-comparison.component.html',
  styleUrls: ['./loyality-comparison.component.scss']
})
export class LoyalityComparisonComponent implements OnInit {

  constructor(public apiSrvc: ApiService, private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal) {
    const data={
      title:'Loyality Comparison',
      path1:'',
      path2:'',
      path3:''
}
  this.apiSrvc.SetHeaderData({
    obj: data
  })
   }

  ngOnInit(): void {
  }

}
