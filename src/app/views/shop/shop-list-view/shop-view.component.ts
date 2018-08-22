import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';


import {ShopService, MasterDataService, MasterDataManagementService} from './../../../module-services';
import {GlobalData} from './../../../shared';
import {NewShopFormComponent} from '../new-shop-form/new-shop-form.component';
import {GlobalFunction, MainConfig} from '../../../shared';
import {forEach} from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-list-view.component.html',
  styleUrls: []
})

export class ShopViewComponent implements OnInit {

  bsModalRef: BsModalRef;
  public shopDetail: any = {};
  public gridConfig: any = {};
  private sveReq: any = {};
  private isCheck = true;
  public shopChategories = [];
  action: string;
  public STATUS_LIST = MainConfig.STATUS_LIST;
  public selectedRows = 0;
  public editShopEntitlement = false;
  public record: any = {};
  public AvailableFunctions = [];
  public AssignedFunctions = [];
  public updateAssignedEnt = [];
  public updateAvailableEnt = [];
  searchText: string;
  searchText1: string;

  constructor (
    private modalService: BsModalService,
    private shopSev: ShopService,
    public globalData: GlobalData,
    private comFun: GlobalFunction,
    public masterSev: MasterDataService,
    public masterMngSev: MasterDataManagementService) {
    this.getShopChatagories();
  }

  ngOnInit () {
    this.initGridConfig();
    this.initFindByReq();
    this.getShopsByCriteria();
  }

  onClickAddBtn () {
    this.shopDetail = {};
    this.openNewShopModel();
  }

  private initFindByReq () {
    this.sveReq = {
      'shopId': this.globalData.authObject.shopId,
      'branchId': this.globalData.authObject.branchId,
      'offset': 0,
      'limit': this.gridConfig.pagination.itemsPerPage,
      'orderByKey': 'shopName',
      'orderByValue': null,
      'searchKeys': [],
      'operators': [],
      'statuses': [
        MainConfig.STATUS_LIST.PENDING.ID, // 1
        MainConfig.STATUS_LIST.APPROVED.ID, // 2
        MainConfig.STATUS_LIST.SUSPENDED.ID, // 6
        MainConfig.STATUS_LIST.DELETED.ID // 8
      ],
      'values': []
    };
  }

  private getShopsByCriteria () {
    this.selectedRows = 0;
    this.gridConfig.records = [];
    this.gridConfig.waitingHttpSve = true;
    this.shopSev.getShopList(this.sveReq).then((response: any) => {
      if (response) {
        this.gridConfig.records = response.data;
        this.gridConfig.pagination.bigTotalItems = response.recordCount;
        this.gridConfig.records.forEach((obj: any) => {
          obj.shopCategoryName = this.mapShopCategory(obj.shopCategory);
        });
      } else if (response === null) {
        this.initFindByReq();
      }
      this.gridConfig.waitingHttpSve = false;
    });
  }

  private mapShopCategory (categoryId: any) {
    let categoryName;
    for (let i = 0; i < this.shopChategories.length; i++) {
      if (this.shopChategories[i].categoryId === categoryId) {
        categoryName = this.shopChategories[i].name;
        break;
      }
    }
    return categoryName;
  }

  private openNewShopModel () {
    const modelConfig: any = {
      class: 'modal-lg',
      animated: true,
      keyboard: true,
      backdrop: true,
      ignoreBackdropClick: true
    };
    this.bsModalRef = null;
    this.bsModalRef = this.modalService.show(NewShopFormComponent, modelConfig);
    this.bsModalRef.content.action = this.action;
    this.bsModalRef.content.shopDetail = this.shopDetail;
    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
    });
  }

  private getShopChatagories () {
    this.shopSev.getShopChatogories().then((response: any) => {
      if (response) {
        this.shopChategories = response;
        console.log('Shop chatogories successfully taken');
      } else {
        console.log('Error occured');
      }
    });
  }

  onGridEvent ($event) {
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
      // case 'view': {
      //   this.viewRow($event.record);
      //   break;
      // }
      case 'check': {
        this.checkList();
        break;
      }
      default: {
        break;
      }
    }
  }

  private gridPageChange (pagination: any) {
    this.sveReq.offset = (pagination.page - 1) * pagination.itemsPerPage;
    this.sveReq.limit = pagination.itemsPerPage;
    this.getShopsByCriteria();
  }

  private gridFilter (filter: any) {
    this.sveReq.operators = [];
    this.sveReq.searchKeys = [];
    this.sveReq.values = [];
    this.sveReq.offset = 0;
    this.sveReq.limit = this.gridConfig.pagination.itemsPerPage;
    for (let i = 0; i < filter.length; i++) {
      if (filter[i].key === 'statusName') {
        filter[i].key = 'status';
        filter[i].value = parseInt(filter[i].value);
      } else if (filter[i].key === 'shopName') {
        filter[i].key = 'shopName';
        filter[i].value = filter[i].value.toString();
      }
      this.sveReq.operators.push(filter[i].operators);
      this.sveReq.searchKeys.push(filter[i].key);
      this.sveReq.values.push(filter[i].value);
    }
    this.getShopsByCriteria();
  }

  private gridRefresh () {
    this.initFindByReq();
    this.getShopsByCriteria();
  }

  private editRow (record: any) {
    this.action = 'edit';
    this.record = record;
    console.log(this.record.shopId);
    this.updateAssignedEnt = [];
    this.updateAvailableEnt = [];
    this.AvailableFunctions = [];
    this.AssignedFunctions = [];
    this.getShopUnAssignedEntitle(this.record.shopId);
    this.getShopAssignedEntitle(this.record.shopId);
    this.editShopEntitlement = true;
     // this.shopDetail = Object.assign({}, records);
     // this.openNewShopModel();
  }

  // private viewRow (recordView: any) {
  //   this.shopDetail = Object.assign({}, recordView);
  //   this.action = 'view';
  //   this.openViewModalWithComponent();
  // }

  private checkList () {
    this.isCheck = true;
    this.selectedRows = 0;
    for (let i = 0; i < this.gridConfig.records.length; i++) {
      if (this.gridConfig.records[i].isCheck) {
        this.selectedRows = this.selectedRows + 1;
        this.isCheck = false;
        break;
      }
    }
  }

  private initGridConfig () {
    this.gridConfig = {
      pagination: {
        maxSize: 5,
        bigTotalItems: 0,
        bigCurrentPage: 1,
        itemsPerPage: 15
      },
      waitingHttpSve: false,
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
          'name': 'Shop Name',
          'key': 'shopName',
          'column_type': 'data',
          'head_align': 'text-left',
          'data_align': 'left',
          'filter': true,
          'filterConfig': {
            'operators': {
              'like': true
            },
            'selected_operator': 'like',
            'type': 'text',
          }
        },
        {
          'name': 'Email',
          'key': 'email',
          'column_type': 'data',
          'data_align': 'left'
        },
        {
          'name': 'City',
          'key': 'city',
          'column_type': 'data',
          'data_align': 'left'
        },
        {
          'name': 'Shop Category',
          'key': 'shopCategoryName',
          'column_type': 'data',
        },
        {
          'name': 'Telephone Number',
          'key': 'telephone',
          'column_type': 'data',
        },
        {
          'name': 'Email',
          'key': 'email',
          'column_type': 'data',
          'data_align': 'left'
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
              'eq': true
            },
            'selected_operator': 'eq',
            'type': 'option',
            'options': [
              {text: MainConfig.STATUS_LIST.PENDING.NAME, value: MainConfig.STATUS_LIST.PENDING.ID},
              {text: MainConfig.STATUS_LIST.APPROVED.NAME, value: MainConfig.STATUS_LIST.APPROVED.ID},
              {text: MainConfig.STATUS_LIST.SUSPENDED.NAME, value: MainConfig.STATUS_LIST.SUSPENDED.ID},
              {text: MainConfig.STATUS_LIST.DELETED.NAME, value: MainConfig.STATUS_LIST.DELETED.ID} // check this for the logic
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
          'disabled_property': {
            'condition_key': 'status',
            'condition_values': [MainConfig.STATUS_LIST.DELETED.ID],
          }
        }
        // {
        //   'name': '',
        //   'key': 'view',
        //   'title': 'View',
        //   'column_type': 'action',
        //   'data_align': 'center',
        //   'btn_type': 'btn-info',
        //   'icon': 'fa-eye',
        //   'width': 35
        // }
      ],
      records: []
    };
  }

  private updateGridRow (updatedData: any) {
    for (let i = 0; i < this.gridConfig.records.length; i++) {
      if (this.gridConfig.records[i].shopId === updatedData.shopId) {
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

  private recordFormat (record: any) {
    const status_object: any = this.comFun.getStatusObject(record.status, MainConfig.STATUS_LIST);
    record.status = status_object.name;
    return record;
  }

  private styleFormat (record: any) {
    const style_format: any = {};
    const status_object: any = this.comFun.getStatusObject(record.status, MainConfig.STATUS_LIST);
    style_format.status = status_object.style;
    return style_format;
  }

  public onUpdateStatus (statusDetails, status) {
    for (let i = 0; i < this.gridConfig.records.length; i++) {
      if (this.gridConfig.records[i].isCheck) {
        this.updateStatus(this.gridConfig.records[i], statusDetails.ID);
      }
    }
  }

  public onConfirmUpdateStatus (statusDetails, status) {
    // prompt the delete staus message box
    // onUpdateStatus (statusDetails, status)
  }

  private updateStatus (record, StatusId) {
    const req = {
      'primaryId': record.shopId,
      'status': StatusId
    };
    this.shopSev.updateShopStatus(req).then((response: any) => {
      if (response) {
        this.getShopsByCriteria();
        this.getGridRow(record);
      }
    });
  }

  private getGridRow (record) {
    for (let i = 0; i < this.gridConfig.records.length; i++) {
      if (this.gridConfig.records[i].shopId === record.shopId) {
        this.updateGridRow(this.gridConfig.records[i]);
        break;
      }
    }
  }


  private getShopAssignedEntitle (shopId) {
    this.masterSev.getEntitlementsByShop(shopId).then((response: any) => {
      if (response) {
        this.AssignedFunctions = response;
      }
    });
  }

  private getShopUnAssignedEntitle (shopId) {
    this.masterSev.getUnAssignEntitlementsByShop(shopId).then((response: any) => {
      if (response) {
        this.AvailableFunctions = response;
      }
    });

  }

  private addEntitlement (shopId, entitlements) {
    const req = {
      'shopId': shopId,
      'entitlementIds': entitlements
    };
    this.masterMngSev.addShopEntitlements(req).then((response: any) => {
      if (response) {
        console.log('Successfully added entitlements');
      }
    });
  }

  private deleteEntitlement (domainId, entitlements) {
    const req = {
      'shopId': domainId,
      'entitlementIds': entitlements
    };
    this.masterMngSev.deleteShopEntitlements(req).then((response: any) => {
      if (response) {
        console.log('Successfully deleted entitlements');
      }
    });
  }
  onClickCancel () {
    this.editShopEntitlement = false;
  }

  onClickSave () {
    const addEntIds = [];
    const deleteEntIds = [];
    this.updateAvailableEnt.forEach((obj: any) => {
      deleteEntIds.push(obj.entitlementId);
    });
    this.updateAssignedEnt.forEach((obj: any) => {
      addEntIds.push(obj.entitlementId);
    });
    this.addEntitlement(this.record.shopId, addEntIds);
    this.deleteEntitlement(this.record.shopId, deleteEntIds);
    this.editShopEntitlement = false;
  }

  onClickAssignAll () {
    this.AvailableFunctions.forEach((obj: any) => {
      obj.isCheck = false;
      this.AssignedFunctions.push(obj);
      this.updateAssignedEnt.push(obj);
    });
    this.AvailableFunctions = [];
  }

  onClickAssignSelected () {
    for (let num = 0; num < this.AvailableFunctions.length; num++) {
      if (this.AvailableFunctions[num].isCheck) {
        this.AvailableFunctions[num].isCheck = false;
        this.updateAssignedEnt.push(this.AvailableFunctions[num]);
        this.AssignedFunctions.push(this.AvailableFunctions[num]);
        this.AvailableFunctions.splice(num, 1);
        num--;
      }
    }
    this.searchText = '';
  }

  onClickUnassignAll () {
    this.AssignedFunctions.forEach((obj: any) => {
      obj.isCheck = false;
      this.AvailableFunctions.push(obj);
      this.updateAvailableEnt.push(obj);
    });
    this.AssignedFunctions = [];
  }

  onClickUnAssignSelected () {
    for (let num = 0; num < this.AssignedFunctions.length; num++) {
      if (this.AssignedFunctions[num].isCheck) {
        this.AssignedFunctions[num].isCheck = false;
        this.updateAvailableEnt.push(this.AssignedFunctions[num]);
        this.AvailableFunctions.push(this.AssignedFunctions[num]);
        this.AssignedFunctions.splice(num, 1);
        num--;
      }
    }
    this.searchText1 = '';
  }

  onChange(entitlement: any) {
    if (entitlement.isCheck) {
      entitlement.isCheck = false;
    } else {
      console.log(entitlement.name);
      entitlement.isCheck = true;
    }

  }
}


