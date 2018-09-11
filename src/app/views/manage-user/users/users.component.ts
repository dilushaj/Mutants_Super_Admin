import { Component, OnInit, Output , EventEmitter } from '@angular/core';
import {GlobalData, MainConfig, GlobalFunction} from '../../../shared';

import { UsersService } from './../../../module-services';
import { Users } from './../../../module-classes';
import {BsModalService} from 'ngx-bootstrap/modal';
import {UserFormComponent} from '../user-form/user-form.component';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {CornerService} from '../../../module-services/corner.service';
import { DatePipe } from '@angular/common';
import {UserViewComponent} from '../user-view/user-view.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [],
  providers: [DatePipe]
})
export class UsersComponent implements OnInit {

  bsModalRef: BsModalRef;
  public gridConfig: any = {};
  public userDetails: any = {};
  private sveReq: any = {};
  private isCheck = true;
  action: string;

  constructor( public globalData: GlobalData, private modalService: BsModalService, private userSev: UsersService,
              private cornerSev: CornerService, private userObj: Users, private datePipe: DatePipe,
              private comFun: GlobalFunction )
            {}

  ngOnInit() {
    this.initGritConfig();
    this.initFindByReq();
    this.getUserFindByCriteria();

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
        // this.gridSort($event.record);
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
      case 'view': {
        this.viewRow($event.record);
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

  private gridPageChange(pagination: any) {
    this.sveReq.offset = (pagination.page - 1) * pagination.itemsPerPage;
    this.sveReq.limit = pagination.itemsPerPage;
    this.getUserFindByCriteria();
  }

  private checkList(){
    this.isCheck = true;
    for (let i = 0; i < this.gridConfig.records.length; i++){
      if (this.gridConfig.records[i].isCheck) {
        this.isCheck = false;
        break;
      }
    }
  }

  private getUserFindByCriteria() {
    this.gridConfig.records = [];
    this.gridConfig.waitingHttpSve = true;
    this.userSev.userFindByCriteria(this.sveReq).then((response: any) => {
      if (response) {
        this.gridConfig.records = response.data;
        this.gridConfig.pagination.bigTotalItems = response.recordCount;
      }
      this.gridConfig.waitingHttpSve = false;
    });
  }

  private gridRefresh() {
    this.initFindByReq();
    this.getUserFindByCriteria();
  }

  private gridFilter(filter: any){
    this.sveReq.operators = [];
    this.sveReq.searchKeys = [];
    this.sveReq.values = [];
    this.sveReq.offset = 0;
    this.sveReq.limit = this.gridConfig.pagination.itemsPerPage;
    for (let i = 0; i < filter.length; i++){
      if (filter[i].key == 'statusName'){
        filter[i].key = 'status';
        filter[i].value = parseInt(filter[i].value);
      }else if (filter[i].key == 'typeName'){
        filter[i].key = 'type';
        filter[i].value = parseInt(filter[i].value);
      }
      this.sveReq.operators.push(filter[i].operators);
      this.sveReq.searchKeys.push(filter[i].key);
      this.sveReq.values.push(filter[i].value);
    }
    this.getUserFindByCriteria();
  }

  private initFindByReq() {
    this.sveReq = {
      'shopId': this.globalData.authObject.shopId,
      'branchId': this.globalData.authObject.branchId,
      'statuses': [
        MainConfig.STATUS_LIST.CREATED.ID,
        MainConfig.STATUS_LIST.PENDING.ID,
        MainConfig.STATUS_LIST.APPROVED.ID,
        MainConfig.STATUS_LIST.SUSPENDED.ID
      ],
      'offset': 0,
      'limit': this.gridConfig.pagination.itemsPerPage,
      'orderByKey': 'asc',
      'orderByValue': 'adminId',
      'searchKeys': [],
      'operators': [],
      'values': []
    };
  }

  private initGritConfig() {
    const cornerList = [];
    for (const key in this.globalData.domainProperty.CORNER){
      cornerList.push(
        {
          'text': this.globalData.domainProperty.CORNER[key].NAME,
          'value': this.globalData.domainProperty.CORNER[key].ID
        }
      );
    }

    this.gridConfig = {
      pagination : {
        maxSize : 5,
        bigTotalItems : 0,
        bigCurrentPage : 1,
        itemsPerPage : 15
      },
      waitingHttpSve : false,
      columns: [
        {
          'name': '',
          'key': 'checkbox',
          'column_type': 'check_box',
          'head_align': 'text-center',
          'data_align': 'center',
          'width': 30
        },
        {
          'name': 'Username',
          'key': 'loginName',
          'column_type': 'data',
          'head_align': 'text-left',
          'data_align': 'left',
        },
        {
          'name': 'Frst Name',
          'key': 'firstName',
          'column_type': 'data',
          'data_align': 'left'
        },
        {
          'name': 'Last Name',
          'key': 'lastName',
          'column_type': 'data',
          'data_align': 'left'
        },
        {
          'name': 'Date Of Birth',
          'key': 'dateOfBirth',
          'column_type': 'data',
        },
        {
          'name': 'Telephone Number',
          'key': 'mobile',
          'column_type': 'data',
        },
        {
          'name': 'Email',
          'key': 'email',
          'column_type': 'data',
          'data_align': 'left'
        },
        {
          'name': 'Business Admin',
          'key': 'superAdminName',
          'data_align': 'center',
          'column_type': 'data'
        },
        {
          'name': 'Status',
          'key': 'statusName',
          'width': 100,
          'column_type': 'data',
          'data_align': 'center',
          'style': {'font-weight': 600},
          'filter': true,
          'filterConfig': {
            'operators': {
              'like': true
            },
            'selected_operator': 'like',
            'type': 'option',
            'options': [
              {text: MainConfig.STATUS_LIST.PENDING.NAME, value: MainConfig.STATUS_LIST.PENDING.ID},
              {text: MainConfig.STATUS_LIST.APPROVED.NAME, value: MainConfig.STATUS_LIST.APPROVED.ID},
              {text: MainConfig.STATUS_LIST.SUSPENDED.NAME, value: MainConfig.STATUS_LIST.SUSPENDED.ID},
              {text: MainConfig.STATUS_LIST.DELETED.NAME, value: MainConfig.STATUS_LIST.DELETED.ID}
            ]
          }
        },
        {
          'name': '',
          'key': 'edit',
          'title': 'Edit',
          'column_type': 'action',
          'data_align': 'center',
          'btn_type': 'btn-primary',
          'icon': 'fa-pencil-square-o',
          'width': 35,
          'disabled_property' : {
            'condition_key': 'status',
            'condition_values': [MainConfig.STATUS_LIST.DELETED.ID],
          }
        },
        {
          'name': '',
          'key': 'view',
          'title': 'View',
          'column_type': 'action',
          'data_align': 'center',
          'btn_type': 'btn-info',
          'icon': 'fa-eye',
          'width': 35
        }
      ],
      records: []
    };
  }

  onClickAddNewBtn() {
    this.userDetails = {};
    this.action = 'add';
    this.openModalWithComponent();
  }

  private editRow(record: any) {
    this.userDetails = Object.assign({}, record);
    this.userDetails.updatedMobile = record.mobile;
    this.action = 'edit';
    this.openModalWithComponent();
  }

  private openModalWithComponent() {
    const modelConfig: any = {
      class: 'modal-lg',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
    };
    this.bsModalRef = null;
    this.bsModalRef = this.modalService.show(UserFormComponent, modelConfig);
    this.bsModalRef.content.action = this.action;
    this.bsModalRef.content.userDetails = this.userDetails;
    this.bsModalRef.content.onClose.subscribe(result => {
      const response = result;
      response.display_format = this.recordFormat(Object.assign({}, result));
      response.style_format = this.styleFormat(Object.assign({}, result));
      if (this.action === 'add') {
        response.tr_class = 'table-success';
        this.gridConfig.records.unshift(response);
      }else if(this.action === 'edit') {
        this.updateGridRow(result);
      }
    });
  }

  private viewRow(recordView: any){
    this.userDetails = Object.assign({}, recordView);
    this.action = 'view';
    this.openViewModalWithComponent();
  }

  private openViewModalWithComponent() {
    const modelConfigs: any = {
      class: 'modal-lg',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
    };
    this.bsModalRef = null;
    this.bsModalRef = this.modalService.show(UserViewComponent, modelConfigs);
    this.bsModalRef.content.action = this.action;
    this.bsModalRef.content.userDetails = this.userDetails;
    this.bsModalRef.content.onClose.subscribe(result => {
    });
  }

  private updateGridRow(updatedData: any){
    for (let i = 0; i < this.gridConfig.records.length; i++){
      if (this.gridConfig.records[i].adminId === updatedData.adminId){
        const record = Object.assign({}, this.gridConfig.records[i], updatedData);
        delete record.display_format;
        delete record.style_format;
        record.display_format = this.recordFormat(Object.assign({}, record));
        record.style_format = this.styleFormat(Object.assign({}, record));
        record.tr_class = 'table-warning';
        this.gridConfig.records[i] = record;
        break;
      }
    }
  }

  private recordFormat(record: any) {
    const status_object: any = this.comFun.getStatusObject(record.status, MainConfig.STATUS_LIST);
    record.status = status_object.name;
    return record;
  }

  private styleFormat(record: any) {
    const style_format: any = {};
    const status_object: any = this.comFun.getStatusObject(record.status, MainConfig.STATUS_LIST);
    style_format.status = status_object.style;
    return style_format;
  }

}
