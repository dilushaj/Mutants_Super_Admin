import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MessageViewComponent } from './../message-view/message-view.component';
import { DatePipe } from '@angular/common';

import { Config, SevConfig, ApiService, ComFunction } from './../../../shared';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: []
})
export class MessageListComponent implements OnInit {
  @ViewChild('messageViewModal') messageViewModal :MessageViewComponent;
  gridConfig : any = {};
  formValue : any = {};
  formAction : string = "add";
  sveReq : any = {};
  waitingHttpSve : boolean = false;
  config : any = {};

  constructor(private datePipe: DatePipe, private viewContainerRef: ViewContainerRef, private apiSev : ApiService, private comFun : ComFunction) { }

  ngOnInit() {
    this.config = Config;
    this.initGritConfig();
    this.initSveReq();
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
        this.viewMessage($event.record);
        break;
      }
      default: {
        break;
      }
    }
  }

  private updateGridRow(updatedData : any){
    for(let i = 0; i < this.gridConfig.records.length; i++){
      if(this.gridConfig.records[i].messageId == updatedData.messageId){
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

  private viewMessage(record: any) {
    this.formValue = {};
    this.formAction = "view";
    if(record.display_format) {
      this.formValue = record.display_format;
    }
    this.messageViewModal.onViewModel()
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
    this.apiSev.httpPost(SevConfig.MESSAGE_SEV,"/findMessagesByCriteria",this.sveReq,null).then((data : any) => {
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
    record.createdDate = this.datePipe.transform(record.createdDate, 'yyyy-MM-dd');
    return record;
  }

  private styleFormat(record : any){
    let style_format : any = {};
    let status_object : any = this.comFun.getStatusObject(record.status, Config.STATUS_LIST);
    style_format.status = status_object.style;
    return style_format;
  }

  private initSveReq(){
    this.sveReq = {
      "offset": 0,
      "limit": this.gridConfig.pagination.itemsPerPage,
      "operators": [],
      "orderByKey": "asc",
      "orderByValue": "messageId",
      "searchKeys": [],
      "statuses": [Config.STATUS_LIST.PENDING.ID, Config.STATUS_LIST.ACCEPTED.ID],
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
          "name":"Name",
          "key":"firstName",
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
          "name":"Mobile",
          "key":"mobile",
          "width":100,
          "column_type":"data",
          "head_align":"text-left",
          "data_align":"left",
          "sort":false,
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
          "name":"Email",
          "key":"email",
          "width":300,
          "column_type":"data",
          "data_align":"left",
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
          "name":"Date",
          "key":"createdDate",
          "width":100,
          "column_type":"data",
          "head_align":"text-center",
          "data_align":"center",
          "sort":false
        },
        {
          "name":"Status",
          "key":"status",
          "width":200,
          "column_type":"data",
          "head_align":"text-center",
          "data_align":"center",
          "style": {"font-weight": 600},
          "sort":true,
          "filter":true,
          "filterConfig": {
            "operators": {
              "like":false,
              "eq":true,
            },
            "selected_operator":"eq",
            "type":"option",
            "options":[
              {text:Config.STATUS_LIST.PENDING.NAME,value:Config.STATUS_LIST.PENDING.ID},
              {text:Config.STATUS_LIST.ACCEPTED.NAME,value:Config.STATUS_LIST.ACCEPTED.ID}
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

}

