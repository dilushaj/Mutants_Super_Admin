import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Config, SevConfig, ApiService, ComFunction } from './../../../shared';
import { ExpandSalesReportComponent } from '../expand-sales-report/expand-sales-report.component';

@Component({
  selector: 'app-sales-report-list',
  templateUrl: './sales-report-list.component.html',
  styleUrls: []
})
export class SalesReportListComponent implements OnInit {
  gridConfig : any = {};
  formValue : any = {};
  formAction : string = "add";
  toDate = new Date();
  fromDate : any;
  currentDate : any;
  sveReq : any = {};
  waitingHttpSve : boolean = false;

  maxDate = new Date();
  newVar: Date = new Date();
  newVar2: Date = new Date();
  private _bsValue : Date;

  @ViewChild('expandSelesReportViewModal') expandSelesReportViewModal : ExpandSalesReportComponent;
  config : any = {};

  constructor(private datePipe: DatePipe, private viewContainerRef: ViewContainerRef, private apiSev : ApiService, private comFun : ComFunction, private router: Router) {}

  get bsValue(): Date {
    return this._bsValue;
  }

  ngOnInit() {
    var previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    this.fromDate = previousMonth;
    this.config = Config;
    this.initGritConfig();
    this.initSveReq();
    this.checkRouter();
    this.loadRecord();
  }

  onFormEvent($event){
    let record = $event.record;
    record.display_format = this.recordFormat(Object.assign({}, $event.record));
    record.style_format = this.styleFormat(Object.assign({}, $event.record));
    this.updateGridRow($event.record);
  }

  onGridEvent($event){
    switch($event.action) {
      case 'pageChange': {
        this.gridPageChange($event.record);
        break;
      }
      case 'filter': {
        this.gridFilter($event.record);
        break;
      }
      case 'sort': {
        this.gridSort($event.record);
        break;
      }
      case 'refresh': {
        this.gridRefresh();
        break;
      }
      case 'view': {
        this.viewSale($event.record);
        break;
      }
      default: {
        break;
      }
    }
  }

  private updateGridRow(updatedData : any){
    for(let i = 0; i < this.gridConfig.records.length; i++){
      if(this.gridConfig.records[i].currencyPairId == updatedData.currencyPairId){
        let record = Object.assign({}, this.gridConfig.records[i], updatedData);
        delete record.display_format;
        delete record.style_format;
        record.display_format = this.recordFormat(Object.assign({},record));
        record.style_format = this.styleFormat(Object.assign({},record));
        record.tr_class = 'table-warning';
        this.gridConfig.records[i] = record;
        break;
      }
    }
  }

  private viewSale(record: any) {
    this.formValue = {};
    this.formAction = "view";
      if (record.display_format) {
        this.formValue = record.display_format;
      }
    this.fromDate = this.datePipe.transform(this.fromDate, 'yyyy-MM-dd HH:mm:ss');
    this.currentDate = this.datePipe.transform(this.toDate, 'yyyy-MM-dd HH:mm:ss');

    this.expandSelesReportViewModal.onViewModel(this.fromDate, this.currentDate);
  }

  onSearch(){
    this.initSveReq();
    this.loadRecord();
  }

  private gridRefresh(){
    this.initSveReq();
    this.loadRecord();
  }

  private gridSort(sort : any){
    this.sveReq.orderByKey = sort.key;
    this.sveReq.orderByValue = sort.value;
    this.loadRecord();
  }

  private gridPageChange(pagination : any){
    this.sveReq.offset = (pagination.page - 1)*pagination.itemsPerPage;
    this.sveReq.limit = pagination.itemsPerPage;
    this.loadRecord();
  }

  private gridFilter(filter : any){
    this.sveReq.operators = [];
    this.sveReq.searchKeys = [];
    this.sveReq.values = [];
    this.sveReq.offset = 0;
    this.sveReq.limit = this.gridConfig.pagination.itemsPerPage;
    for(let i = 0; i < filter.length; i++){
      if(filter[i].key == "status"){
        filter[i].value = parseInt(filter[i].value);
      }
      this.sveReq.operators.push(filter[i].operators);
      this.sveReq.searchKeys.push(filter[i].key);
      this.sveReq.values.push(filter[i].value);
    }
    this.loadRecord();
  }

  private loadRecord(){
    this.gridConfig.records = [];
    this.gridConfig.waitingHttpSve = true;
    this.apiSev.httpPost(SevConfig.REPORT_SEV,"/sales_report",this.sveReq,null).then((data : any) => {
      if(data){
        for(let i = 0; i < data.data.length; i++){
          let record = data.data[i];
          record.display_format = this.recordFormat(Object.assign({}, data.data[i]));
          record.style_format = this.styleFormat(Object.assign({}, data.data[i]));
          this.gridConfig.records.push(record);
        }
        this.gridConfig.pagination.bigTotalItems = data.recordCount;
      }
      this.gridConfig.waitingHttpSve = false;
    }).catch((error : any) => {
      this.gridConfig.waitingHttpSve = false;
    });
  }

  private recordFormat(record : any){
    let status_object : any = this.comFun.getStatusObject(record.status, Config.STATUS_LIST);
    record.status = status_object.name;
    record.createdDate = this.datePipe.transform(record.createdDate, 'dd/MM/yyyy');
    return record;
  }

  private styleFormat(record : any){
    let style_format : any = {};
    let status_object : any = this.comFun.getStatusObject(record.status, Config.STATUS_LIST);
    style_format.status = status_object.style;
    return style_format;
  }

  private initSveReq(){
    let statuses = this.sveReq.statuses;
    let fDate = this.datePipe.transform(this.fromDate, 'yyyy-MM-dd HH:mm:ss');
    let tDate = this.datePipe.transform(this.toDate, 'yyyy-MM-dd HH:mm:ss');
    this.sveReq = {
      "offset": 0,
      "limit": this.gridConfig.pagination.itemsPerPage,
      "operators": [],
      "fromDate": fDate,
      "orderByKey": "asc",
      "orderByValue": "orderId",
      "searchKeys": [],
      "statuses": statuses || [],
      "toDate": tDate,
      "values": []
    };
  }

  private initGritConfig(){
    this.gridConfig = {
      pagination : {
        maxSize : 5,
        bigTotalItems : 0,
        bigCurrentPage : 1,
        itemsPerPage : 15
      },
      waitingHttpSve : false,
      columns:[
        {
          "name":"Currency Pair",
          "key":"currencyPair",
          "width":300,
          "column_type":"data",
          "head_align":"text-left",
          "data_align":"left",
          "sort":true,
          "filter":true,
          "filterConfig": {
            "operators": {
              "like":true,
              "eq":true,
            },
            "selected_operator":"like",
            "type":"text"
          }
        },
        {
          "name":"Value",
          "key":"value",
          "width":200,
          "column_type":"number",
          "head_align":"text-left",
          "data_align":"right",
          "sort":false,
          "filter":false,
          "filterConfig": {
            "operators": {
              "like":true
            },
            "selected_operator":"like",
            "type":"text"
          }
        },
        {
          "name":"",
          "key":"view",
          "title":"View",
          "column_type":"action",
          "data_align":"center",
          "btn_type":"btn-info",
          "icon":"fa-eye",
          "width":35
        }
      ],
      records:[]
    }
  }

  private checkRouter(){
    //console.log(this.router.url);
    switch(this.router.url) {
      case '/reports/sales/pending': {
        this.sveReq.statuses = [Config.STATUS_LIST.PENDING.ID];
        break;
      }
      case '/reports/sales/approved': {
        this.sveReq.statuses = [Config.STATUS_LIST.APPROVED.ID];
        break;
      }
      case '/reports/sales/rejected': {
        this.sveReq.statuses = [Config.STATUS_LIST.REJECTED.ID];
        break;
      }
      default: {
        this.sveReq.statuses = [Config.STATUS_LIST.PENDING.ID, Config.STATUS_LIST.APPROVED.ID, Config.STATUS_LIST.REJECTED.ID];
        break;
      }
    }
  }

}

