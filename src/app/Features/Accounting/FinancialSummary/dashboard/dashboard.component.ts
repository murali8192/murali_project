import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service';
// import { DetailsComponent } from '../details/details.component';
import { formatDate } from "@angular/common";
import { FsDetailsComponent } from '../fs-details/fs-details.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  PresentMonth: any; 
   LastYearMonth:any;
   Today=new Date();

   PresentYear: any;
   PrsntDate:any;
   PresentFullDate:any; 

   LYMdate:any;
   lm_date=new Date();
   LastMonth: any;

   LastMonthDate1:any;
   LastMonthDate2:any;
   LastMonthDate3: any;
   LastMonthDate4:any;
   LastMonthDate5: any;
   LastMonthDate6:any;

  SelectedTab: any =['StoreSummary'];
   PDate=new Date();
   FSData: any = [];
   EBITDAdata: any =[];
   ETBudgetData: any =[];
   ETDealerData: any =[];
 
   Filter: any ='StoreSummary';
   SubFilter: any =''
   StoreName: any ="All Stores"
 
   NoData: boolean=false;
   date:any
  constructor(public apiSrvc: ApiService, private ngbmodal: NgbModal, private ngbmodalActive: NgbActiveModal,private spinner: NgxSpinnerService) {
    this.date=new Date()
    const data = {
      title: 'Financial Summary',
      path1: '',
      path2: '',
      path3: '',
      Month: this.date,
      stores: 0,
      filter: this.Filter,
      subfilter: this.SubFilter
    }
    this.apiSrvc.SetHeaderData({
      obj: data
    })
   }

  ngOnInit(): void {   
    let today=  new Date();      
   
     const format = 'MM-yyyy';
     const locale = 'en-US';
     const myDate = this.PDate;
     const formattedDate = formatDate(myDate, format, locale); 
     this.PrsntDate = formattedDate;
     console.log(this.PrsntDate);

     this.PresentMonth = today;
     this.Today.setMonth(this.Today.getMonth()-12);        
     this.LastYearMonth = this.Today.toISOString().slice(0,10);
     const  lymformatedDate = formatDate(this.LastYearMonth,format,locale)
     this.LYMdate = lymformatedDate
     console.log(this.LYMdate);
     
     const format2 = "yyyy-MM-dd"
     const presentDate = this.PresentMonth
     const PrstFormattedDate = formatDate( presentDate, format2, locale); 
     this.PresentFullDate = PrstFormattedDate
     console.log(this.PresentFullDate);
     
      
      this.lm_date.setMonth(this.lm_date.getMonth()-1);
      this.LastMonth=this.lm_date.toISOString().slice(0,10);

      const lastmonthdate1 =new Date();
      lastmonthdate1.setMonth(lastmonthdate1.getMonth()-1);
      this.LastMonthDate1 = lastmonthdate1.toISOString().slice(0, 10);
      const lastmonthdate2=new Date();
      lastmonthdate2.setMonth(lastmonthdate2.getMonth()-2);
      this.LastMonthDate2 = lastmonthdate2.toISOString().slice(0, 10);
      const lastmonthdate3=new Date();
      lastmonthdate3.setMonth(lastmonthdate3.getMonth()-3);
      this.LastMonthDate3 = lastmonthdate3.toISOString().slice(0, 10);
      const lastmonthdate4=new Date();
      lastmonthdate4.setMonth(lastmonthdate4.getMonth()-4);
      this.LastMonthDate4 = lastmonthdate4.toISOString().slice(0, 10);
      const lastmonthdate5=new Date();
      lastmonthdate5.setMonth(lastmonthdate5.getMonth()-5);
      this.LastMonthDate5 = lastmonthdate5.toISOString().slice(0, 10);
      const lastmonthdate6=new Date();
      lastmonthdate6.setMonth(lastmonthdate6.getMonth()-6);
      this.LastMonthDate6 = lastmonthdate6.toISOString().slice(0, 10);

      this.GetData();
      this.GetDataEBITDA();
      this.GetETBudgetData();
      this.GetETDealerData();
      this.GetVKBudgetData_NU();
      this.GetVKBudgetData_PC();
      this.GetVKBudgetData_CV();
      this.GetVKDealerData_NU();
      this.GetVKDealerData_PC();
      this.GetVKDealerData_CV();
  }

  GetData(){
    console.log(this.date.toString().substr(4,3),this.date.toString().substr(8,2),this.date.toString().substr(11,4));
     this.Month=this.date.toString().substr(8,2)+'-'+this.date.toString().substr(4,3)+'-'+this.date.toString().substr(11,4)
   this.FSData = [];
   this.spinner.show();
   let Obj ={
    "as_Id":this.StoreValues,
    "SalesDate":this.Month
    // "as_Id":"0",
    // "SalesDate":this.PresentFullDate
    }
   this.apiSrvc.postmethod('xtract/GetFinancialSummaryReport', Obj).subscribe(
    res => {
      if (res.status == 200) {
        this.FSData = res.response
        console.log(this.FSData);  
        this.FSData = this.FSData.map(v => ({ ...v, FS_Symbol :'3' }))
        console.log(this.FSData);

        this.FSData.forEach((val,i)=>{
          if(i == 2 || i == 5 || i == 8 || i==12 || i==13 
            || i==18 || i == 29 || i == 30 || i == 36 || i ==37){
            val.FS_Symbol = '2'
          }
        })
        console.log("Fs Data", this.FSData);
        
        if (this.FSData.length == 0) {
          this.NoData = true;
        }
        else {
          this.NoData = false
        }     
        this.spinner.hide(); 
      }
      else {
        alert('Invalid Details');
      }
    },
    (error) => {
      console.log(error);
    })
  }

  GetDataEBITDA(){
    console.log(this.date.toString().substr(4,3),this.date.toString().substr(8,2),this.date.toString().substr(11,4));
    this.Month=this.date.toString().substr(8,2)+'-'+this.date.toString().substr(4,3)+'-'+this.date.toString().substr(11,4)
    this.EBITDAdata = [];
    this.spinner.show();
    let Obj ={
      "as_Id": this.StoreValues,
      "SalesDate": this.Month
    }
    this.apiSrvc.postmethod('xtract/GetFinancialEBITDAReport', Obj).subscribe(
      res => {
        if (res.status == 200) {
          this.EBITDAdata = res.response
          console.log(this.EBITDAdata);  
          this.EBITDAdata = this.EBITDAdata.map(v => ({ ...v, EBITDA_Symbol :'3' }))
          console.log(this.EBITDAdata);
  
          this.EBITDAdata.forEach((val,i)=>{
            if(i == 5 || i == 10 || i == 15 || i== 16 || i==21
              || i==22 ||  i == 29 || i == 30){
              val.EBITDA_Symbol = '2'
            }
          })
          console.log("EBITDA Data", this.EBITDAdata);
          
          if (this.EBITDAdata.length == 0) {
            this.NoData = true;
          }
          else {
            this.NoData = false
          }     
          this.spinner.hide(); 
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      })

  }

  GetGetDataEBITDA(){
    console.log(this.date.toString().substr(4,3),this.date.toString().substr(8,2),this.date.toString().substr(11,4));
    this.Month=this.date.toString().substr(8,2)+'-'+this.date.toString().substr(4,3)+'-'+this.date.toString().substr(11,4)
    this.EBITDAdata = [];
    this.spinner.show();
    let Obj ={
      "as_Id": this.StoreValues,
      "SalesDate": this.Month
    }
    this.apiSrvc.postmethod('xtract/GetFinancialEBITDAReport', Obj).subscribe(
      res => {
        if (res.status == 200) {
          this.EBITDAdata = res.response
          console.log(this.EBITDAdata);  
          this.EBITDAdata = this.EBITDAdata.map(v => ({ ...v, EBITDA_Symbol :'3' }))
          console.log(this.EBITDAdata);
  
          this.EBITDAdata.forEach((val,i)=>{
            if(i == 5 || i == 10 || i == 15 || i== 16 || i==21
              || i==22 ||  i == 29 || i == 30){
              val.EBITDA_Symbol = '2'
            }
          })
          console.log("EBITDA Data", this.EBITDAdata);
          
          if (this.EBITDAdata.length == 0) {
            this.NoData = true;
          }
          else {
            this.NoData = false
          }     
          this.spinner.hide(); 
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      })
    }

 GetETBudgetData(){
    console.log(this.date.toString().substr(4,3),this.date.toString().substr(8,2),this.date.toString().substr(11,4));
    this.Month=this.date.toString().substr(8,2)+'-'+this.date.toString().substr(4,3)+'-'+this.date.toString().substr(11,4)
    this.ETBudgetData = [];
    this.spinner.show();
    let Obj ={
      "as_Id": this.StoreValues,
      "SalesDate": this.Month
    }
    this.apiSrvc.postmethod('xtract/GetFinancialETReportVsBudget', Obj).subscribe(
      res => {
        if (res.status == 200) {
          this.ETBudgetData = res.response
          console.log(this.ETBudgetData);  
          this.ETBudgetData = this.ETBudgetData.map(v => ({ ...v, ETB_Symbol :'3' }))
          console.log(this.ETBudgetData);
  
          this.ETBudgetData.forEach((val,i)=>{
            if(i == 5 || i == 10 || i == 15 || i== 26 || i==53
              || i==69 ||  i == 71 || i == 30){
              val.ETB_Symbol = '2'
            }
            if(i == 16 || i == 27 || i == 54 || i== 70 || i== 72
              || i==73 ||  i == 79 || i == 80){
              val.ETB_Symbol = '4'
            }
          })
          console.log("ETbudget Data", this.ETBudgetData);
          
          if (this.ETBudgetData.length == 0) {
            this.NoData = true;
          }
          else {
            this.NoData = false
          }     
          this.spinner.hide(); 
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      })

  }

  GetETDealerData(){
    console.log(this.date.toString().substr(4,3),this.date.toString().substr(8,2),this.date.toString().substr(11,4));
    this.Month=this.date.toString().substr(8,2)+'-'+this.date.toString().substr(4,3)+'-'+this.date.toString().substr(11,4)
    this.ETDealerData = [];
    this.spinner.show();
    let Obj ={
      "as_Id": this.StoreValues,
      "SalesDate": this.Month
    }
    this.apiSrvc.postmethod('xtract/GetFinancialETReportVsDealer', Obj).subscribe(
      res => {
        if (res.status == 200) {
          this.ETDealerData = res.response
          console.log(this.ETDealerData);  
          this.ETDealerData = this.ETDealerData.map(v => ({ ...v, ETB_Symbol :'3' }))
          console.log(this.ETDealerData);
  
          this.ETDealerData.forEach((val,i)=>{
            if(i == 4 || i == 14|| i== 39 || i == 55 || i== 56 ){
              val.ETB_Symbol = '2'
            }
          })
          console.log("ETDealer Data", this.ETDealerData);
          
          if (this.ETDealerData.length == 0) {
            this.NoData = true;
          }
          else {
            this.NoData = false
          }     
          this.spinner.hide(); 
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      })

  }

  VKBudgetData_NU: any =[];
  GetVKBudgetData_NU(){
    console.log(this.date.toString().substr(4,3),this.date.toString().substr(8,2),this.date.toString().substr(11,4));
    this.Month=this.date.toString().substr(8,2)+'-'+this.date.toString().substr(4,3)+'-'+this.date.toString().substr(11,4)
    this.VKBudgetData_NU = [];
    this.spinner.show();
    let Obj ={
      "BLOCK": "NU",
      "pack": "N",
      "as_Id": this.StoreValues,
      "SalesDate": this.Month
    }
    this.apiSrvc.postmethod('xtract/GetFinancialVariableVsBudget', Obj).subscribe(
      res => {
        if (res.status == 200) {
          this.VKBudgetData_NU = res.response
          console.log(this.VKBudgetData_NU);  
          this.VKBudgetData_NU = this.VKBudgetData_NU.map(v => ({ ...v, ETB_Symbol :'3' }))
          console.log(this.VKBudgetData_NU);
  
          this.VKBudgetData_NU.forEach((val,i)=>{
            if(i == 3 || i == 6 || i == 11 || i== 14 || i==15
              || i==16 ||  i == 21 || i == 26){
              val.ETB_Symbol = '4'
            }
      
          })
          console.log("ETbudget NU Data", this.VKBudgetData_NU);
          
          if (this.VKBudgetData_NU.length == 0) {
            this.NoData = true;
          }
          else {
            this.NoData = false
          }     
          this.spinner.hide(); 
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      })
  }

  VKBudgetData_PC: any =[];
  GetVKBudgetData_PC(){
    console.log(this.date.toString().substr(4,3),this.date.toString().substr(8,2),this.date.toString().substr(11,4));
    this.Month=this.date.toString().substr(8,2)+'-'+this.date.toString().substr(4,3)+'-'+this.date.toString().substr(11,4)
    this.VKBudgetData_PC = [];
    this.spinner.show();
    let Obj ={
      "BLOCK": "PC",
      "pack": "N",
      "as_Id": this.StoreValues,
      "SalesDate": this.Month
    }
    this.apiSrvc.postmethod('xtract/GetFinancialVariableVsBudget', Obj).subscribe(
      res => {
        if (res.status == 200) {
          this.VKBudgetData_PC = res.response
          console.log(this.VKBudgetData_PC);  
          this.VKBudgetData_PC = this.VKBudgetData_PC.map(v => ({ ...v, ETB_Symbol :'3' }))
          console.log(this.VKBudgetData_PC);
  
          this.VKBudgetData_PC.forEach((val,i)=>{
            if(i == 3 || i == 6 || i == 9 || i== 10 || i== 14
              || i==17 ||  i == 20){
              val.ETB_Symbol = '4'
            }
          })
          console.log("ETbudget PC Data", this.VKBudgetData_PC);
          
          if (this.VKBudgetData_PC.length == 0) {
            this.NoData = true;
          }
          else {
            this.NoData = false
          }     
          this.spinner.hide(); 
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      })
  }

  VKBudgetData_CV: any =[];
  GetVKBudgetData_CV(){
    console.log(this.date.toString().substr(4,3),this.date.toString().substr(8,2),this.date.toString().substr(11,4));
    this.Month=this.date.toString().substr(8,2)+'-'+this.date.toString().substr(4,3)+'-'+this.date.toString().substr(11,4)
    this.VKBudgetData_CV = [];
    this.spinner.show();
    let Obj ={
      "BLOCK": "CV",
      "pack": "N",
      "as_Id": this.StoreValues,
      "SalesDate": this.Month
    }
    this.apiSrvc.postmethod('xtract/GetFinancialVariableVsBudget', Obj).subscribe(
      res => {
        if (res.status == 200) {
          this.VKBudgetData_CV = res.response
          console.log(this.VKBudgetData_CV);  
          this.VKBudgetData_CV = this.VKBudgetData_CV.map(v => ({ ...v, ETB_Symbol :'3' }))
          console.log(this.VKBudgetData_CV);
  
          this.VKBudgetData_CV.forEach((val,i)=>{
        
            if(i == 3 || i == 6 || i == 13 || i== 16 ){
              val.ETB_Symbol = '4'
            }
          })
          console.log("ETbudget CV Data", this.VKBudgetData_CV);
          
          if (this.VKBudgetData_CV.length == 0) {
            this.NoData = true;
          }
          else {
            this.NoData = false
          }     
          this.spinner.hide(); 
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      })
  }

  VkDealerData_NU: any =[];
  GetVKDealerData_NU(){
    console.log(this.date.toString().substr(4,3),this.date.toString().substr(8,2),this.date.toString().substr(11,4));
    this.Month=this.date.toString().substr(8,2)+'-'+this.date.toString().substr(4,3)+'-'+this.date.toString().substr(11,4)
    this.VkDealerData_NU = [];
    this.spinner.show();
    let Obj ={
      "BLOCK": "NU",
      "as_Id": this.StoreValues,
      "SalesDate": this.Month
    }
    this.apiSrvc.postmethod('xtract/GetFinancialVariableVsDealer', Obj).subscribe(
      res => {
        if (res.status == 200) {
          this.VkDealerData_NU = res.response
          console.log(this.VkDealerData_NU);  
          this.VkDealerData_NU = this.VkDealerData_NU.map(v => ({ ...v, ETB_Symbol :'3' }))
          console.log(this.VkDealerData_NU);
  
          this.VkDealerData_NU.forEach((val,i)=>{
            if(i == 3 || i == 6 || i == 11 || i== 14 || i==15
              || i==16 ||  i == 21 || i == 26){
              val.ETB_Symbol = '4'
            }
      
          })
          console.log("VKDealer NU Data", this.VkDealerData_NU);
          
          if (this.VkDealerData_NU.length == 0) {
            this.NoData = true;
          }
          else {
            this.NoData = false
          }     
          this.spinner.hide(); 
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      })
  }

  VkDealerData_PC: any =[];
  GetVKDealerData_PC(){
    console.log(this.date.toString().substr(4,3),this.date.toString().substr(8,2),this.date.toString().substr(11,4));
    this.Month=this.date.toString().substr(8,2)+'-'+this.date.toString().substr(4,3)+'-'+this.date.toString().substr(11,4)
    this.VkDealerData_PC = [];
    this.spinner.show();
    let Obj ={
      "BLOCK": "PC",
      "as_Id": this.StoreValues,
      "SalesDate": this.Month
    }
    this.apiSrvc.postmethod('xtract/GetFinancialVariableVsDealer', Obj).subscribe(
      res => {
        if (res.status == 200) {
          this.VkDealerData_PC = res.response
          console.log(this.VkDealerData_PC);  
          this.VkDealerData_PC = this.VkDealerData_PC.map(v => ({ ...v, ETB_Symbol :'3' }))
          console.log(this.VkDealerData_PC);
  
          this.VkDealerData_PC.forEach((val,i)=>{
            if(i == 3 || i == 6 || i == 11 || i== 14 || i==15
              || i==16 ||  i == 21 || i == 26){
              val.ETB_Symbol = '4'
            }
      
          })
          console.log("VKDealer PC Data", this.VkDealerData_PC);
          
          if (this.VkDealerData_PC.length == 0) {
            this.NoData = true;
          }
          else {
            this.NoData = false
          }     
          this.spinner.hide(); 
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      })
  }

  VkDealerData_CV: any =[];
  GetVKDealerData_CV(){
    console.log(this.date.toString().substr(4,3),this.date.toString().substr(8,2),this.date.toString().substr(11,4));
    this.Month=this.date.toString().substr(8,2)+'-'+this.date.toString().substr(4,3)+'-'+this.date.toString().substr(11,4)
    this.VkDealerData_CV = [];
    this.spinner.show();
    let Obj ={
      "BLOCK": "CV",
      "as_Id": this.StoreValues,
      "SalesDate": this.Month
    }
    this.apiSrvc.postmethod('xtract/GetFinancialVariableVsDealer', Obj).subscribe(
      res => {
        if (res.status == 200) {
          this.VkDealerData_CV = res.response
          console.log(this.VkDealerData_CV);  
          this.VkDealerData_CV = this.VkDealerData_CV.map(v => ({ ...v, ETB_Symbol :'3' }))
          console.log(this.VkDealerData_CV);
  
          this.VkDealerData_CV.forEach((val,i)=>{
            if(i == 3 || i == 6 || i == 11 || i== 14 || i==15
              || i==16 ||  i == 21 || i == 26){
              val.ETB_Symbol = '4'
            }
      
          })
          console.log("VKDealer CV Data", this.VkDealerData_CV);
          
          if (this.VkDealerData_CV.length == 0) {
            this.NoData = true;
          }
          else {
            this.NoData = false
          }     
          this.spinner.hide(); 
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        console.log(error);
      })
  }
 

  public inTheGreen(value: number): boolean {
    if (value >= 0) {
      return true;
    }
    return false;
  }
  

Month:any=''
StoreValues:any=0
ngAfterViewInit(): void {
  this.apiSrvc.GetReports().subscribe((data) => {
    if (data.obj.Reference == 'FS') {
      this.date = data.obj.month
      this.Month = data.obj.month
      this.StoreValues = data.obj.storeValues
      this.StoreName = data.obj.Sname
      this.Filter = data.obj.filters
      this.SubFilter = data.obj.subfilters
      this.DataSelection(this.Filter);
      // this.DataSelection(this.SubFilter);
      // this.GetData()
      const headerdata = {
        title: 'Financial Summary',
        path1: '',
        path2: '',
        path3: '',
        Month: data.obj.month,
        stores: data.obj.storeValues,
        filter: data.obj.filters,
        subfilter: data.obj.subfilters
      }    
      // // console.log(headerdata)
      this.apiSrvc.SetHeaderData({
        obj: headerdata
      })
    }
  })
}
SubSelectedTab1:any =[];
DataSelection(Val){
  console.log(this.Filter);  
  console.log(this.SubFilter);
  this.SelectedTab = [];
  this.SubSelectedTab1 =[];
  this.SelectedTab.push(this.Filter);
  this.SubSelectedTab1.push(this.SubFilter)
  if(this.Filter == "StoreSummary"){
    this.GetData();
  }
  if(this.Filter == "AdjustedEbitda"){
    this.GetDataEBITDA();
  }
  if(this.Filter == "ExpenseTrend"){
    if(this.SubFilter == "VariableTrendsvsBudget"){
     this.GetETBudgetData();
    }
    if(this.SubFilter == "VariableTrendsvsStores"){
     this.GetETDealerData();
    }
  }
  if(this.Filter == "VariableKPI"){
    if(this.SubFilter == "VariableTrendsvsBudget"){
      this.GetVKBudgetData_NU();
      this.GetVKBudgetData_PC();
      this.GetVKBudgetData_CV();
     }

  }
}

openMenu(Object,Date){
  console.log(Object);
  console.log(Date);
  
  const DetailsSalesPeron = this.ngbmodal.open(FsDetailsComponent,{
    size:'xl',
    backdrop: "static",
  });
  DetailsSalesPeron.componentInstance.Fsdetails = {"TYPE":Object.LABLE1Val,"NAME":Object.LABLE1,"DATE":Date,"STORES":this.StoreValues,'LatestDate':this.Month};
  
}
}
