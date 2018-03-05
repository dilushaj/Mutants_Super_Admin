import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { OrderViewComponent } from './../order-view/order-view.component';
import { OrderAcceptComponent } from './../order-accept/order-accept.component';
import { OrderRejectComponent } from './../order-reject/order-reject.component';
import { Config, SevConfig, ApiService, ComFunction } from './../../../shared';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: []
})
export class OrderListComponent implements OnInit {

  @ViewChild('orderViewModal') orderViewModal: OrderViewComponent;
  @ViewChild('orderAcceptModal') orderAcceptModal: OrderAcceptComponent;
  @ViewChild('orderRejectModal') orderRejectModal: OrderRejectComponent;
  gridConfig : any = {};
  formValue : any = {};
  gridRowRecord : any = {};
  formAction : string = "add";
  sveReq : any = {};
  isCheck : boolean = true;
  waitingHttpSve : boolean = false;
  config : any = {};

  constructor(private viewContainerRef: ViewContainerRef, private apiSev : ApiService, private comFun : ComFunction, private router: Router,private datePipe: DatePipe) { }

  ngOnInit() {
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
        this.viewOrder($event.record);
        break;
      }
      case 'accept': {
        this.acceptOrder($event.record);
        break;
      }
      case 'reject': {
        this.rejectOrder($event.record);
        break;
      }
      default: {
        break;
      }
    }
  }

  // onChangeStatus(status){
  //   this.updateStatus(status);
  // }
  //
  // private updateStatus(status){
  //   for(let i = 0; i < this.gridConfig.records.length; i++){
  //     if(this.gridConfig.records[i].isCheck){
  //       let req = {
  //         "primaryId": this.gridConfig.records[i].orderId,
  //         "status": status
  //       };
  //       this.waitingHttpSve = true;
  //       this.apiSev.httpPut(SevConfig.ORDER_SEV,"/update_status",req,null).then((data : any) => {
  //         if(data){
  //           this.updateGridRow({orderId : data.id,"status" : data.status});
  //         }
  //         this.gridConfig.records[i].isCheck = false;
  //         this.waitingHttpSve = false;
  //         this.gridConfig.isCheckAll = false;
  //       }).catch((error : any) => {
  //         this.gridConfig.records[i].isCheck = false;
  //         this.waitingHttpSve = false;
  //       });
  //     }
  //   }
  // }

  private updateGridRow(updatedData : any){
    for(let i = 0; i < this.gridConfig.records.length; i++){
      if(this.gridConfig.records[i].orderId == updatedData.orderId){
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

  private viewOrder(record: any){
    this.formValue = {};
    this.formAction = "view";
    if(record.display_format){
      this.formValue = record.display_format;
    }
    this.orderViewModal.onViewModel()
  }
  private acceptOrder(record: any){
    this.formValue = {};
    this.formAction = "accept";
    if(record.display_format){
      this.formValue = record.display_format;
    }
    this.orderAcceptModal.onAcceptModel()
  }
  private rejectOrder(record: any){
    this.formValue = {};
    this.formAction = "reject";
    if(record.display_format){
      this.formValue = record.display_format;
    }
    this.orderRejectModal.onRejectModel();
  }

  private gridRefresh(){
    this.initSveReq();
   // this.checkRouter();
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
    this.apiSev.httpPost(SevConfig.ORDER_SEV,"/findOrdersByCriteria",this.sveReq,null).then((data : any) => {
      //console.log(data);
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
    if(record.customerFirstName){
      record.customerFirstName = record.customerFirstName + " " + record.customerLastName;
    }
    if(record.status){
      record.status = status_object.name;
    }
    if(record.quantity){
      record.quantity = record.quantity.toFixed(6);
    }
    if(record.createdDate){
      record.createdDate = this.datePipe.transform(record.createdDate, 'yyyy-MM-dd HH:mm:ss');
    }
    return record;
  }

  private styleFormat(record : any){
    let style_format : any = {};
    if(record.status){
      let status_object : any = this.comFun.getStatusObject(record.status, Config.STATUS_LIST);
      style_format.status = status_object.style;
    }
    return style_format;
  }

  private initSveReq(){
    let statuses = this.sveReq.statuses;
    this.sveReq = {
      "offset": 0,
      "limit": this.gridConfig.pagination.itemsPerPage,
      "operators": [],
      "orderByKey": "asc",
      "orderByValue": "orderId",
      "searchKeys": [],
      "values": [],
      "statuses": statuses || []
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
          "name":"Order Id",
          "key":"orderId",
          "width":100,
          "column_type":"data",
          "data_align":"left",
          "sort":true
        },
        {
          "name":"Name",
          "key":"customerFirstName",
          "width":200,
          "column_type":"data",
          "data_align":"left",
          "sort":false,
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
          "name":"Quantity",
          "key":"quantity",
          "width":130,
          "column_type":"data",
          "data_align":"right",
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
          "name":"From Currency",
          "key":"fromCurrency",
          "width":220,
          "column_type":"data",
          "data_align":"center",
          "filter":true,
          "filterConfig": {
            "operators": {
              "like":true
            },
            "selected_operator":"like",
            "type":"text"
          }
        },
        {
          "name":"Final Value",
          "key":"finalValue",
          "width":200,
          "column_type":"number",
          "data_align":"right",
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
          "name":"To Currency",
          "key":"toCurrency",
          "width":170,
          "column_type":"data",
          "data_align":"center",
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
          "name":"Order Time",
          "key":"createdDate",
          "width":200,
          "column_type":"data",
          "head_align":"text-center",
          "data_align":"center",
          "sort":true
        },
        {
          "name":"Status",
          "key":"status",
          "width":120,
          "column_type":"data",
          "head_align":"text-center",
          "data_align":"center",
          "style": {"font-weight": 600},
          "sort":false,
          "filter":false,
          "filterConfig": {
            "operators": {
              "like":true,
              "eq":true,
            },
            "selected_operator":"like",
            "type":"option",
            "options":[
              {text:Config.STATUS_LIST.PENDING.NAME,value:Config.STATUS_LIST.PENDING.ID},
              {text:Config.STATUS_LIST.APPROVED.NAME,value:Config.STATUS_LIST.APPROVED.ID},
              {text:Config.STATUS_LIST.SUSPENDED.NAME,value:Config.STATUS_LIST.SUSPENDED.ID}
            ]
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
      case '/order/pending': {
        this.sveReq.statuses = [Config.STATUS_LIST.PENDING.ID];
        this.gridConfig.columns.push({
          "name":"",
          "key":"accept",
          "title":"Accept",
          "column_type":"action",
          "data_align":"center",
          "btn_type":"btn-success",
          "icon":"fa-thumbs-up",
          "width":35
        });
        this.gridConfig.columns.push({
          "name":"",
          "key":"reject",
          "title":"Reject",
          "column_type":"action",
          "data_align":"center",
          "btn_type":"btn-danger",
          "icon":"fa fa-ban",
          "width":35
        });
        break;
      }
      case '/order/approved': {
        this.sveReq.statuses = [Config.STATUS_LIST.APPROVED.ID];
        break;
      }
      case '/order/rejected': {
        this.sveReq.statuses = [Config.STATUS_LIST.REJECTED.ID];
        break;
      }
      default: {
        this.sveReq.statuses = [Config.STATUS_LIST.PENDING.ID,Config.STATUS_LIST.APPROVED.ID,Config.STATUS_LIST.REJECTED.ID];
        break;
      }
    }
  }


}
