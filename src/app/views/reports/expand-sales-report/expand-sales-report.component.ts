import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {ApiService, ComFunction, Config, SevConfig} from '../../../shared';
import {DatePipe} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expand-sales-report',
  templateUrl: './expand-sales-report.component.html',
  styleUrls: []
})
export class ExpandSalesReportComponent implements OnInit, OnChanges {
  @Input() formValue: any;
  @Input() action: string;
  gridConfig: any = {};
  config: any = {};
  sveReq: any = {};
  displayValue: any = {};
  title : any;
  fromDate: any;
  toDate: any;
  @ViewChild('expandSalesReport') expandSalesReport: ModalDirective;

  constructor(private datePipe: DatePipe, private apiSev: ApiService, private comFun: ComFunction, private router: Router) {
  }

  ngOnInit() {
    this.config = Config;
    this.initGritConfig();
    this.checkRouter();
    this.checkPageTitle();
  }

  ngOnChanges() {
    this.displayValue = this.formValue;
    this.initSveReq();
    if (this.gridConfig.pagination != null) {
      this.loadRecord();
    }
  }

  onViewModel(fromDat, toDat) {
    this.fromDate = fromDat;
    this.toDate = toDat;
    this.expandSalesReport.show();
  }

  onCloseSalesReportViewModal(): void {
    this.expandSalesReport.hide();
  }

  onGridEvent($event) {
    switch ($event.action) {
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
      default: {
        break;
      }
    }
  }

  private gridPageChange(pagination: any) {
    this.sveReq.offset = (pagination.page - 1) * pagination.itemsPerPage;
    this.sveReq.limit = pagination.itemsPerPage;
    this.loadRecord();
  }

  private gridFilter(filter: any) {
    switch (this.router.url) {
      case '/reports/customer': {
        let customerName = this.formValue.customerName;
        this.sveReq.operators = ['like'];
        this.sveReq.searchKeys = ['customerName'];
        this.sveReq.values = [customerName];
        this.sveReq.offset = 0;
        this.sveReq.limit = this.gridConfig.pagination.itemsPerPage;
        for (let i = 0; i < filter.length; i++) {
          if (filter[i].key == "status") {
            filter[i].value = parseInt(filter[i].value);
          }
          this.sveReq.operators.push(filter[i].operators);
          this.sveReq.searchKeys.push(filter[i].key);
          this.sveReq.values.push(filter[i].value);
        }
        this.loadRecord();
        break;
      }
      default: {
        let currencyPair = this.formValue.currencyPair;
        this.sveReq.operators = ['eq'];
        this.sveReq.searchKeys = ['currencyPair'];
        this.sveReq.values = [currencyPair];
        this.sveReq.offset = 0;
        this.sveReq.limit = this.gridConfig.pagination.itemsPerPage;
        for (let i = 0; i < filter.length; i++) {
          if (filter[i].key == "status") {
            filter[i].value = parseInt(filter[i].value);
          }
          this.sveReq.operators.push(filter[i].operators);
          this.sveReq.searchKeys.push(filter[i].key);
          this.sveReq.values.push(filter[i].value);
        }
        this.loadRecord();
        break;
      }
    }
  }

  private gridSort(sort: any) {
    this.sveReq.orderByKey = sort.key;
    this.sveReq.orderByValue = sort.value;
    this.loadRecord();
  }

  private gridRefresh() {
    this.initSveReq();
    this.loadRecord();
  }

  private loadRecord() {
    this.gridConfig.records = [];
    this.gridConfig.waitingHttpSve = true;
    this.apiSev.httpPost(SevConfig.REPORT_SEV, "/expand_sales_report", this.sveReq, null).then((data: any) => {
      if (data) {
        for (let i = 0; i < data.data.length; i++) {
          let record = data.data[i];
          record.display_format = this.recordFormat(Object.assign({}, data.data[i]));
          record.style_format = this.styleFormat(Object.assign({}, data.data[i]));
          this.gridConfig.records.push(record);
        }
        this.gridConfig.pagination.bigTotalItems = data.recordCount;
      }
      this.gridConfig.waitingHttpSve = false;
    }).catch((error: any) => {
      this.gridConfig.waitingHttpSve = false;
    });
  }

  private initSveReq() {
    let statuses = this.sveReq.statuses;
    let values = this.formValue.value;
    let fDate = this.fromDate;
    let tDate = this.toDate;

    switch (this.router.url) {
      case '/reports/customer': {
        let customerName = this.formValue.customerName;
        if (this.gridConfig.pagination != null) {
          this.sveReq = {
            "offset": 0,
            "limit": this.gridConfig.pagination.itemsPerPage,
            "operators": ['eq'],
            "fromDate": fDate,
            "orderByKey": "asc",
            "orderByValue": 'orderId',
            "searchKeys": ['customerName'],
            "statuses": statuses || [],
            "toDate": tDate,
            "values": [customerName]
          };
        }
      break;
      }
      default: {
        let currencyPair = this.formValue.currencyPair;
        if (this.gridConfig.pagination != null) {
          this.sveReq = {
            "offset": 0,
            "limit": this.gridConfig.pagination.itemsPerPage,
            "operators": ['eq'],
            "fromDate": fDate,
            "orderByKey": "asc",
            "orderByValue": 'orderId',
            "searchKeys": ['currencyPair'],
            "statuses": statuses || [],
            "toDate": tDate,
            "values": [currencyPair]
          };
        }
         break;
      }
    }
  }

  private recordFormat(record: any) {
    let status_object: any = this.comFun.getStatusObject(record.status, Config.STATUS_LIST);
    record.status = status_object.name;
    record.createdDate = this.datePipe.transform(record.createdDate, 'yyyy-MM-dd');
    return record;
  }

  private styleFormat(record: any) {
    let style_format: any = {};
    let status_object: any = this.comFun.getStatusObject(record.status, Config.STATUS_LIST);
    style_format.status = status_object.style;
    return style_format;
  }

  private initGritConfig() {
    this.gridConfig = {
      pagination: {
        maxSize: 5,
        bigTotalItems: 0,
        bigCurrentPage: 1,
        itemsPerPage: 10
      },
      waitingHttpSve: false,
      columns: [
        {
          "name": "Order Id",
          "key": "orderId",
          "width": 100,
          "column_type": "data",
          "head_align": "text-left",
          "data_align": "left",
          "sort": false,
          "filter": false,
          "filterConfig": {
            "operators": {
              "like": true,
              "eq": true,
            },
            "selected_operator": "like",
            "type": "text"
          }
        },
        {
          "name": "Customer Name",
          "key": "customerName",
          "width": 400,
          "column_type": "data",
          "head_align": "text-left",
          "data_align": "left",
          "sort": true,
          "filter": true,
          "filterConfig": {
            "operators": {
              "like": true
            },
            "selected_operator": "like",
            "type": "text"
          }
        },
        {
          "name": "Customer Email",
          "key": "customerEmile",
          "width": 300,
          "column_type": "data",
          "head_align": "text-left",
          "data_align": "left",
          "sort": false,
          "filter": false,
          "filterConfig": {
            "operators": {
              "like": true
            },
            "selected_operator": "like",
            "type": "text"
          }
        },
        {
          "name": "Customer Mobile",
          "key": "customerMobile",
          "width": 200,
          "column_type": "data",
          "head_align": "text-left",
          "data_align": "left",
          "sort": false,
          "filter": false,
          "filterConfig": {
            "operators": {
              "like": true
            },
            "selected_operator": "like",
            "type": "text"
          }
        },
        {
          "name": "Order Value",
          "key": "orderValue",
          "width": 200,
          "column_type": "number",
          "head_align": "text-left",
          "data_align": "right",
          "sort": false,
          "filter": false,
          "filterConfig": {
            "operators": {
              "like": true
            },
            "selected_operator": "like",
            "type": "text"
          }
        },
        {
          "name": "Commission",
          "key": "commission",
          "width": 200,
          "column_type": "number",
          "head_align": "text-left",
          "data_align": "right",
          "sort": false,
          "filter": false,
          "filterConfig": {
            "operators": {
              "like": true
            },
            "selected_operator": "like",
            "type": "text"
          }
        },
        {
          "name": "Final Value",
          "key": "finalValue",
          "width": 200,
          "column_type": "number",
          "head_align": "text-left",
          "data_align": "right",
          "sort": false,
          "filter": false,
          "filterConfig": {
            "operators": {
              "like": true
            },
            "selected_operator": "like",
            "type": "text"
          }
        },
        {
          "name": "Order Date",
          "key": "createdDate",
          "width": 200,
          "column_type": "data",
          "head_align": "text-left",
          "data_align": "center",
          "sort": true,
          "filter": true,
          "filterConfig": {
            "operators": {
              "like": true
            },
            "selected_operator": "like",
            "type": "date"
          }
        },
      ],
      records: []
    }
  }

  private checkRouter() {
    switch (this.router.url) {
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

  private checkPageTitle(){
    switch (this.router.url) {
      case '/reports/customer': {
        this.title = "Customer View"
        break;
      }
      case '/reports/commission': {
        this.title = "Commission View"
        break;
      }
      default: {
        this.title = "Sales View"
        break;
      }
    }
  }
}

