import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ApiService } from '../../Core/Providers/ApiService/api.service';
import { ExcelService } from '../../Core/Providers/ExcelService/excel.service';
import { PdfService } from '../../Core/Providers/PdfService/pdf.service';

import {MenuComponent} from '../menu/menu.component'
import {BsReportsComponent} from '../../Features/Accounting/BalanceSheet/bs-reports/bs-reports.component'
import { FsReportsComponent } from 'src/app/Features/Accounting/FinancialSummary/fs-reports/fs-reports.component';
import { CitReportsComponent } from 'src/app/Features/Accounting/FloorplanReconciliation/cit-reports/cit-reports.component';
import { CitAnalyseComponent } from 'src/app/Features/Accounting/FloorplanReconciliation/cit-analyse/cit-analyse.component';
import { SalesgrossReportsComponent } from 'src/app/Features/Sales/SalesGross/salesgross-reports/salesgross-reports.component';
import { ScReportsComponent } from 'src/app/Features/Sales/SalesConversion/sc-reports/sc-reports.component';
import { ServicegrossReportsComponent } from 'src/app/Features/ServiceBodyShop/ServiceGross/servicegross-reports/servicegross-reports.component';
import { PartsgrossReportsComponent } from 'src/app/Features/Parts/PartsGross/partsgross-reports/partsgross-reports.component';
import { ScheduleReportsComponent } from 'src/app/Features/Accounting/Schedules/schedule-reports/schedule-reports.component';
import { NightlysalesReportComponent } from 'src/app/Features/Sales/NightlySalesSummary/nightlysales-report/nightlysales-report.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() Parentcomponent;
  updatedDate: any = '-'
  updatedTime: any = '-'
  @Output() UpdatedDateFun = new EventEmitter();
  ModulesData: any = [];
  ShowModules: any;
  title: String;
  isShown = true;
  componentDetails: any;
  count: any = 1
  favList: any = []
  selectedStore='0';
  SubModulesData : any =[];
  roleId:any=1

  constructor(private ngbmodal: NgbModal,
    private ngbmodalActive: NgbActiveModal,
    public apiSrvc: ApiService,
    private excelService: ExcelService,
    private pdfService: PdfService, 
    private Router: Router
    ) {

      Router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {        
          let authObj = event.url.substring(1);        
            this.apiSrvc.directSignIn(authObj).subscribe((authData: any) => {
              console.log('data', authData)
              // this.Router.navigate(['/SalesGross'])
              if(authData.status == 200){
                this.roleId=authData.response[0].roleid
                this.getData()
              }      
          })
        };  
      })
    this.apiSrvc.GetHeaderData().subscribe(res => {
      this.componentDetails = res.obj
      console.log(this.componentDetails)
    });
    // if (this.componentDetails.path1 == '') {
    //   this.isShown = false;
    // }
  }

  ngOnInit() {  
    const Data = {
      state: true
    }
    this.apiSrvc.setBackgroundstate({ obj: Data })
 
    const obj = {}
    this.apiSrvc.postmethod('xtract/LastUpdated', obj).subscribe(res => {
      console.log(res.response[0].LastUpdatedDate);
      console.log(res.response[0].LastUpdatedTime);
      this.updatedTime = res.response[0].LastUpdatedTime
      this.updatedDate = res.response[0].LastUpdatedDate
    })
    this.getData()
    this.getFav('0')
    this.getmodules();


  }
    getmodules(){
    let Obj = {
      "RoleID": "1",
      "expression": "mod_status='Y'"
    }
      this.apiSrvc.postmethod('permissionsbasedonroles/get', Obj).subscribe(res => {
      this.ModulesData = res.response;
      console.log(this.ModulesData)
      // this.SubMod_Id=res.SMOD_ID;
      this.ModulesData.forEach(res =>{
        if(res.MOD_ID == 0 && res.SMOD_ID != 0){
          this.SubModulesData.push(res)
          // console.log(this.SubModulesData);
        }
      })
      
    })
  }
  submodules(e){
    // alert(e)
    this.favList=[]
    // this.getFav(e)
    this.selectedStore=e
  }
  getFav(e) {
  //   const obj = {
  //     "Id": e,
  //     "expression": ""
  //   }
  //   this.apiSrvc.postmethod('favourite/get', obj).subscribe(res => {
  //     this.favList = res.response;
  //     // console.log(this.favList);


  //   });
   }
  navigate(item) {

  //   localStorage.setItem('Fav', "Y")
  //   localStorage.setItem('Fav_id', item.Fav_id)
  //   // document.getElementById("closeFav").click();  
  //   this.closeNav()
  //   let navComponent = this.ShowModules.filter(e => e.SMOD_ID == item.Fav_Module_Id)
  //   // console.log(navComponent)
  //   this.Router.navigateByUrl(navComponent[0].SMOD_FILENAME).then(page => { window.location.reload(); });


   }
  openNav() {
    document.getElementById("mySidenav").style.width = "350px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
   getData() {

    this.ShowModules = [];
    let Obj = {
      "RoleID": "1",
      "expression": "mod_status='Y'"
    }
    this.apiSrvc.postmethod('permissionsbasedonroles/get', Obj).subscribe(res => {
      this.ModulesData = res.response;
      console.log(this.ModulesData);
      this.ModulesData.forEach(e => {
        // if(e.status == "Y"){
        this.ShowModules.push(e);
        // console.log(this.ShowModules)
        // } 
      })
    });
 };

   openMenu() {
      const modalRef = this.ngbmodal.open(MenuComponent, {
      size: 'xl',
      backdrop: "static",
    });
    modalRef.componentInstance.Parentcomponent = this.ShowModules;
  // }
  // openAnalyze(){
  //   this.ngbmodalActive=this.ngbmodal.open(AnalyseComponent, {
  //     size:'xl',
  //     backdrop: "static"
  //   });
  } 

   openAnalyze() {
    if (this.componentDetails.title == 'Cit Floorplan Report') {
      this.ngbmodalActive = this.ngbmodal.open(CitAnalyseComponent, {
        size: 'xl',
        backdrop: "static"
      });

    }

  //   if (this.componentDetails.title == 'Sales Gross') {
  //     this.ngbmodalActive = this.ngbmodal.open(AnalyseComponent, {
  //       size: 'xl',
  //       backdrop: "static"
  //     });
  //   }
 }

   openFilter() {
  //   // this.ngbmodalActive=this.ngbmodal.open(ReportsComponent, {
  //   //   size:'xl',
  //   //   backdrop: "static",

  //   // });
    if (this.componentDetails.title == 'Sales Gross') {
      const Data = {
        state: false
      }
      this.apiSrvc.setBackgroundstate({ obj: Data })
      const modalRef = this.ngbmodal.open(SalesgrossReportsComponent, {
        size: 'xl',
        backdrop: "static",
      });
      modalRef.componentInstance.Parentcomponent = 'SG';
      modalRef.result.then((data) => {
      }, (reason) => {
        // on dismiss
        const Data = {
          state: true
        }
        this.apiSrvc.setBackgroundstate({ obj: Data })
      });
    }
    if (this.componentDetails.title == 'Service Gross') {
      const modalRef = this.ngbmodal.open(ServicegrossReportsComponent, {
        size: 'xl',
        backdrop: "static",
      });
      modalRef.componentInstance.Parentcomponent = 'SrvcG';
    }
    if (this.componentDetails.title == 'Balance Sheet') {
      const modalRef = this.ngbmodal.open(BsReportsComponent, {
        size: 'xl',
        backdrop: "static",
      });
      modalRef.componentInstance.Parentcomponent = 'BS';
    }
    if (this.componentDetails.title == 'Schedules / Managed Accounts') {
      const modalRef = this.ngbmodal.open(ScheduleReportsComponent, {
        size: 'xl',
        backdrop: "static",
      });
      modalRef.componentInstance.Parentcomponent = 'SMA';
    }

    if (this.componentDetails.title == 'Cit Floorplan Report') {
      const modalRef = this.ngbmodal.open(CitReportsComponent, {
        size: 'xl',
        backdrop: "static",
      });
      modalRef.componentInstance.Parentcomponent = 'SR';
    }
    if (this.componentDetails.title == 'Sales Conversion') {
      const modalRef = this.ngbmodal.open(ScReportsComponent, {
        size: 'xl',
        backdrop: "static",
      });
      modalRef.componentInstance.Parentcomponent = 'SR';
    }
    if (this.componentDetails.title == 'Parts Gross') {
      const modalRef = this.ngbmodal.open(PartsgrossReportsComponent, {
        size: 'xl',
        backdrop: "static",
      });
      modalRef.componentInstance.Parentcomponent = 'PG';
    }
    if (this.componentDetails.title == 'Financial Summary') {
      const modalRef = this.ngbmodal.open(FsReportsComponent, {
        size: 'xl',
        backdrop: "static",
      });
      modalRef.componentInstance.Parentcomponent = 'FS';
    }

    if(this.componentDetails.title=='Nightly Sales Report'){
      const modalRef = this.ngbmodal.open(NightlysalesReportComponent,{
        size:'xl',
        backdrop: "static",
      });
      modalRef.componentInstance.Parentcomponent = 'SRC';
    }

   }
  onclosemsg() {

    this.ngbmodalActive.close();
  }
  exportAsXLSX() {
    this.excelService.SalesReportsXLSX();

  }
   exportAsPDF() {
    this.pdfService.GetPrintData();
   }

}
