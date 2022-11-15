import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbCalendar, NgbDateParserFormatter, NgbDate, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormArray, FormGroup, } from '@angular/forms';
import { ApiService } from '../../../../Core/Providers/ApiService/api.service'
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-fs-reports',
  templateUrl: './fs-reports.component.html',
  styleUrls: ['./fs-reports.component.scss']
})
export class FsReportsComponent implements OnInit {
  StoresIds: any = []
  @Input() Parentcomponent: any;
  stores: any = [];
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  Performance: any = 'Load'

  constructor(private ngbmodel: NgbModal, private renderer: Renderer2, private service: ApiService,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private formBuilder: FormBuilder, private config: NgbDatepickerConfig
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const TagName = e.target as HTMLButtonElement
      if (TagName.className === 'd-block modal fade show modal-static') {
        this.close()
      }
    });
  }

  month: any

  ngOnInit() {
    this.getStores();
    this.service.GetHeaderData().subscribe(res => {
      if (this.Performance == 'Load') {
        if (res.obj.title == 'Financial Summary') {
          this.month = res.obj.Month
        }
        if(res.obj.filter !=''){
          this.FilterTabs=[]
          this.FilterTabs.push(res.obj.filter)
        }
        if(res.obj.subfilter !=''){
          this.SubFiltersTab=[]
          this.SubFiltersTab.push(res.obj.subfilter)
        }
          
          
          // : data.obj.filters,
          // subfilter: data.obj.subfilters)
      }
    })

  }



  save() {
    // console.log(this.DropdownFiltersForm.value)
  }
  onOpenCalendar(container) {
    container.setViewMode('month');
    container.monthSelectHandler = (event: CalendarCellViewModel): void => {
      container.value = event.date;
      return;
    };
  }

  changeDate(e) {
    let year = e.getFullYear()
    let lastDay = new Date(e.getFullYear(), e.getMonth() + 1, 0);
    let month = parseInt(("0" + (lastDay.getMonth() + 1)).slice(-2))
    let day = parseInt(("0" + lastDay.getDate()).slice(-2))
    this.fromDate = new NgbDate(year, month, 1);
    this.toDate = new NgbDate(year, month, day);
  }
  close() {
    this.ngbmodel.dismissAll()
    this.Performance = 'Unload'
  }

  viewreport() {

    let sname: any = 'All Stores'
    if (this.selectedStore.toString() !== "0") {
      sname = this.stores.filter(e => e.AS_ID == this.selectedStore)
      sname = sname[0].DEALER_NAME
    }

    const data = {
      Reference: this.Parentcomponent,
      storeValues: this.selectedStore,
      month: this.month,
      Sname: sname,
      filters: this.FilterTabs.toString(),
      subfilters:this.SubFiltersTab.toString()

    }
    console.log(data)
    this.service.SetReports({
      obj: data
    })
    this.Performance = 'Unload'
    this.close()

  }

  selectedStore: any = "0"
  StoreFilter(val) {
    console.log(val.target.value);
    this.selectedStore = val.target.value
  }

  getStores() {
    const obj = {
      "AU_ID": 1
    };
    this.service.postmethod('xtract/GetStores', obj).subscribe(
      res => {
        if (res.status == 200) {
          this.stores = res.response
          // console.log(this.stores);
          this.service.GetHeaderData().subscribe(res => {
            if (res.obj.title == 'Financial Summary' && this.Performance == 'Load') {
              this.selectedStore = res.obj.stores
            }
          });
        }
        else {
          alert('Invalid Details');
        }
      },
      (error) => {
        // console.log(error);
      })
  }

  FilterTabs: any = ['StoreSummary']
  SubFiltersTab:any=[]
  multipleorsingle(block, e) {

    if (block == 'FT') {
      this.FilterTabs = [];
      this.SubFiltersTab =[];
      this.FilterTabs.push(e)
      if(e== 'ExpenseTrend' || e=='VariableKPI'){
        this.SubFiltersTab.push('VariableTrendsvsBudget')
      }
    }
    if (block == 'SFT') {     
      this.SubFiltersTab =[];    
      this.SubFiltersTab.push(e)    
    }

  }
}
