import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
import {ExcelService} from '../../../../Core/Providers/ExcelService/excel.service'
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-fs-details',
  templateUrl: './fs-details.component.html',
  styleUrls: ['./fs-details.component.scss']
})
export class FsDetailsComponent implements OnInit {
  @Input() Fsdetails: any ;
   as_id:any =[];
  FSDetailsData : any =[];
  pageNumber: any = 1

  details: any = []
  NoData: boolean;
  loadMore = 1;
  spinnerLoader:boolean=true

  constructor(private ngbmodel: NgbModal,
              private renderer: Renderer2,
              private apiSrvc: ApiService,
              private excelService: ExcelService,) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement
      if (TagName.className === 'd-block modal fade show modal-static') {
        // this.closeBtn.nativeElement.click();
        this.close()
      }
    });
   }

  ngOnInit(): void {
    console.log(this.Fsdetails);    
    this.GetDetails();   
  }

  getStoresId(Value){
  console.log(Value);  
  
  }
  GetDetails(){
    const Obj ={
       "Type": this.Fsdetails.TYPE,
       "Date": this.Fsdetails.DATE,
       "Stores":  this.Fsdetails.STORES == undefined || this.Fsdetails.STORES == null || this.Fsdetails.STORES == 0 ? '' : this.Fsdetails.STORES,
       "PageNumber": this.pageNumber,
       "PageSize": "100"
   }
  console.log(Obj);
  
   this.apiSrvc.postmethod('xtract/GetFinacialSummaryDetails', Obj).subscribe(
     res => {
       if (res.status == 200) {
         this.details = res.response
         this.FSDetailsData = [...this.FSDetailsData, ...this.details];
         // this.FSDetailsData=res.response
         console.log(this.FSDetailsData);
         // this.spinner.hide()
         this.spinnerLoader=false;
         if (this.FSDetailsData.length > 0) {
           this.NoData = false
         }
         else {
           this.NoData = true
         }
 
       }
 
     })
 
   }
   updateVerticalScroll(event): void {
     console.log(event);
     
    if (event.target.scrollTop + event.target.clientHeight >=
      event.target.scrollHeight
    ) {
      if (this.pageNumber == 1) {
       this.spinnerLoader=true
          this.pageNumber++
          this.GetDetails()
        }
        else {
          if (this.details.length > 0) {  
            this.spinnerLoader=true    
            this.pageNumber++
            this.GetDetails()
          }
        }
  }
}
  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }
  
  close() {
    this.ngbmodel.dismissAll()
  }
  exportAsXLSX(){
    let element = document.getElementById('Details')
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "sheet1");
    XLSX.writeFile(wb, this.Fsdetails.NAME+' Details.xlsx') 
 }
}
