import { Component, OnInit } from '@angular/core';
import { AppConfig, MainConfig, GlobalFunction, GlobalData, MessageBoxConfirmComponent } from './../../../shared';

import { BranchService } from './../../../module-services';
import { Branch } from './../../../module-classes';


@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html'
})
export class BranchListComponent implements OnInit {

  public gridConfig : any = {};
  private sveReq : any = {};
  private isCheck : boolean = true;

  constructor(
    private branchSev : BranchService,
    private branchObj : Branch,
    public globalData : GlobalData) {
  }

  ngOnInit() {
    this.initGritConfig();
    this.initFindByReq();
    this.getBranchFindByCriteria();
  }

  onGridEvent($event){
    //console.log($event.record);
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
      case 'edit': {
        this.editRow($event.record);
        break;
      }
      case 'check': {
        this.checkList();
        break;
      }
      default: {
        break;
      }
    }
  }

  private editRow(record : any){
    console.log(record);
  }

  private gridRefresh(){
    this.initFindByReq();
    this.getBranchFindByCriteria();
  }

  private gridSort(sort : any){
    this.sveReq.orderByKey = sort.key;
    this.sveReq.orderByValue = sort.value;
    this.getBranchFindByCriteria();
  }

  private gridPageChange(pagination : any){
    this.sveReq.offset = (pagination.page - 1)*pagination.itemsPerPage;
    this.sveReq.limit = pagination.itemsPerPage;
    this.getBranchFindByCriteria();
  }

  private gridFilter(filter : any){
    this.sveReq.operators = [];
    this.sveReq.searchKeys = [];
    this.sveReq.values = [];
    this.sveReq.offset = 0;
    this.sveReq.limit = this.gridConfig.pagination.itemsPerPage;
    for(let i = 0; i < filter.length; i++){
      if(filter[i].key == "statusName"){
        filter[i].key = "status";
        filter[i].value = parseInt(filter[i].value);
      }else if(filter[i].key == "typeName"){
        filter[i].key = "type";
        filter[i].value = parseInt(filter[i].value);
      }
      this.sveReq.operators.push(filter[i].operators);
      this.sveReq.searchKeys.push(filter[i].key);
      this.sveReq.values.push(filter[i].value);
    }
    this.getBranchFindByCriteria();
  }

  private checkList(){
    //console.log(this.gridConfig.records);
    this.isCheck = true;
    for(let i = 0; i < this.gridConfig.records.length; i++){
      if(this.gridConfig.records[i].isCheck){
        this.isCheck = false;
        break;
      }
    }
  }

  private getBranchFindByCriteria(){
    this.gridConfig.records = [];
    this.gridConfig.waitingHttpSve = true;
    this.branchSev.branchFindByCriteria(this.sveReq).then((response : any) => {
      if(response){
        this.gridConfig.records = response.data;
        this.gridConfig.pagination.bigTotalItems = response.recordCount;
      }
      this.gridConfig.waitingHttpSve = false;
    });
  }

  private initFindByReq(){
    this.sveReq = {
      "shopId":this.globalData.authObject.shopId,
      "branchId":this.globalData.authObject.branchId,
      "statuses":[
        MainConfig.STATUS_LIST.CREATED.ID,
        MainConfig.STATUS_LIST.PENDING.ID,
        MainConfig.STATUS_LIST.APPROVED.ID,
        MainConfig.STATUS_LIST.SUSPENDED.ID
      ],
      "offset":0,
      "limit":this.gridConfig.pagination.itemsPerPage,
      "orderByKey": "asc",
      "orderByValue": "branchId",
      "searchKeys": [],
      "operators": [],
      "values": []
    };
  }

  private initGritConfig(){
    let cornerList = [];

    for(var key in this.globalData.domainProperty.CORNER){
      cornerList.push(
        {
          "text": this.globalData.domainProperty.CORNER[key].NAME,
          "value": this.globalData.domainProperty.CORNER[key].ID
        }
      )
    }

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
          "name":"",
          "key":"checkbox",
          "column_type":"check_box",
          "head_align":"text-center",
          "data_align":"center",
          "width":30
        },
        {
          "name":"Name",
          "key":"branchName",
          "column_type":"data",
          "head_align":"text-left",
          "data_align":"left",
          "width":200,
        },
        {
          "name":"Telephone",
          "key":"telephone",
          "width":200,
          "column_type":"data",
          "data_align":"left"
        },
        {
          "name":"Open Status",
          "key":"openName",
          "width":200,
          "column_type":"data",
          "data_align":"left"
        },
        {
          "name":"Status",
          "key":"statusName",
          "width":100,
          "column_type":"data",
          "data_align":"center",
          "style": {"font-weight": 600},
          // "filter":true,
          // "filterConfig": {
          //   "operators": {
          //     "like":true
          //   },
          //   "selected_operator":"like",
          //   "type":"option",
          //   "options":[
          //     {text:MainConfig.STATUS_LIST.PENDING.NAME,value:MainConfig.STATUS_LIST.PENDING.ID},
          //     {text:MainConfig.STATUS_LIST.APPROVED.NAME,value:MainConfig.STATUS_LIST.APPROVED.ID},
          //     {text:MainConfig.STATUS_LIST.SUSPENDED.NAME,value:MainConfig.STATUS_LIST.SUSPENDED.ID}
          //   ]
          // }
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
