import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
// import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ApiService } from '../../../Core/Providers/ApiService/api.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  title : any;
  constructor(private apiSrvc: ApiService) { 
    this.apiSrvc.GetHeaderData().subscribe(appTitle => this.title = appTitle.obj.title);
    console.log(this.title);
  }


  SalesReportsXLSX(){  
    console.log(this.title);
    
    let element = document.getElementById(this.title)
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "sheet1");
    XLSX.writeFile(wb, this.title+'.xlsx')
  }
}
