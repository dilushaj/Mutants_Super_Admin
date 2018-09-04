import {Component, OnInit, NgZone} from '@angular/core';
import {AppConfig, MainConfig, GlobalFunction, GlobalData, MessageBoxConfirmComponent} from './../../../shared';
import {ShopService, MasterDataService, MasterDataManagementService} from './../../../module-services';
import * as CloneDeep from 'lodash/CloneDeep';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html'
})
export class BranchListComponent implements OnInit {

  public gridConfig: any = {};
  public entitlementConfig: any = {};
  private sveReq: any = {};
  private isCheck = true;
  public shopChategories = [];
  public selectedRows = 0;
  action: string;
  public editDomainEntitlement = false;
  public record: any = {};
  public AvailableFunctions = [];
  public AssignedFunctions = [];
  public updateAssignedEnt = [];
  public updateAvailableEnt = [];
  searchText: string;
  searchText1: string;
  constructor (
    private shopSev: ShopService,
    public globalData: GlobalData,
    public masterSev: MasterDataService,
    public masterMngSev: MasterDataManagementService,
    private Zone: NgZone) {
  }

  ngOnInit () {
    this.initGridConfig();
    this.initFindByReq();
    this.getShopChatagories();
  }

  private initFindByReq () {
    this.sveReq = {
      'offset': 0,
      'limit': this.gridConfig.pagination.itemsPerPage,
      'operators': [],
      'statuses': [
        MainConfig.STATUS_LIST.PENDING.ID, // 1
        MainConfig.STATUS_LIST.APPROVED.ID, // 2
        MainConfig.STATUS_LIST.SUSPENDED.ID, // 6
      ],
      'values': []
    };
  }

  private getShopChatagories () {
    this.selectedRows = 0;
    this.gridConfig.records = [];
    this.shopSev.getShopChatogories().then((response: any) => {
      if (response) {
        this.gridConfig.records = response;
        this.gridConfig.pagination.bigTotalItems = response.length;
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
      case 'check': {
        this.checkList();
        break;
      }
      default: {
        break;
      }
    }
  }

  onGrid2Event ($event) {
    switch ($event.action) {
      case 'pageChange': {
        this.gridPageChange($event.record);
        break;
      }
      case 'filter': {
        this.gridFilter($event.record);
        break;
      }
      case 'check': {
        this.entitleCheckList();
        break;
      }
    }
  }

  private editRow (record: any) {
    this.action = 'edit';
    this.record = record;
    // this.entitlementConfiguration();
    this.updateAssignedEnt = [];
    this.updateAvailableEnt = [];
    this.getDomainUnAssignedEntitle(record.categoryId);
    this.getDomainAssignedEntitle(record.categoryId);
    this.editDomainEntitlement = true;
  }

  private gridRefresh () {
    this.getShopChatagories();
  }

  // private gridSort(sort : any){
  //   this.sveReq.orderByKey = sort.key;
  //   this.sveReq.orderByValue = sort.value;
  //   this.getBranchFindByCriteria();
  // }
  private gridPageChange (pagination: any) {
    this.sveReq.offset = (pagination.page - 1) * pagination.itemsPerPage;
    this.sveReq.limit = pagination.itemsPerPage;
    this.getShopChatagories();
  }

  private gridFilter (filter: any) {
    this.sveReq.operators = [];
    this.sveReq.values = [];
    this.sveReq.offset = 0;
    this.sveReq.limit = this.gridConfig.pagination.itemsPerPage;
    for (let i = 0; i < filter.length; i++) {
      if (filter[i].key === 'statusName') {
        filter[i].key = 'status';
        filter[i].value = parseInt(filter[i].value);
      } else if (filter[i].key === 'name') {
        filter[i].key = 'name';
        filter[i].value = filter[i].value.toString();
      }
      this.sveReq.operators.push(filter[i].operators);
      this.sveReq.searchKeys.push(filter[i].key);
      this.sveReq.values.push(filter[i].value);
    }
    this.getShopChatagories();
  }

  private checkList () {
    this.isCheck = true;
    for (let i = 0; i < this.gridConfig.records.length; i++) {
      if (this.gridConfig.records[i].isCheck) {
        this.isCheck = false;
        break;
      }
    }
  }

  private entitleCheckList () {

  }

  private initGridConfig () {
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
          'name': 'Domain Id',
          'key': 'categoryId',
          'column_type': 'data',
          'head_align': 'text-left',
          'data_align': 'left',
          'width': 200,
        },
        {
          'name': 'Domain',
          'key': 'name',
          'column_type': 'data',
          'head_align': 'text-left',
          'data_align': 'left',
          'width': 200,
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
            'selected_operator': 'eq',
            'type': 'option',
            'options': [
              {text: MainConfig.STATUS_LIST.PENDING.NAME, value: MainConfig.STATUS_LIST.PENDING.ID},
              {text: MainConfig.STATUS_LIST.APPROVED.NAME, value: MainConfig.STATUS_LIST.APPROVED.ID},
              {text: MainConfig.STATUS_LIST.SUSPENDED.NAME, value: MainConfig.STATUS_LIST.SUSPENDED.ID}
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
      ],
      records: []
    };
  }

  private entitlementConfiguration () {
    this.entitlementConfig = {
      pagination: {
        maxSize: 5,
        bigTotalItems: 0,
        bigCurrentPage: 1,
        itemsPerPage: 15
      },
      waitingHttpSve: false,
      columns: [
        {
          'name': 'Entitlement',
          'key': 'name',
          'column_type': 'data',
          'head_align': 'text-left',
          'data_align': 'left',
          'width': 200,
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
          'name': '',
          'key': 'checkbox',
          'column_type': 'check_box',
          'head_align': 'text-center',
          'data_align': 'center',
          'width': 30
        }
      ],
      records: []
    };
  }

  private getAllEntitlements () {
    let entitlements = [];
    this.masterSev.getAllEntitlements().then((response: any) => {
      if (response) {
        console.log(response.length);
        entitlements = response;
      }
    });
    return entitlements;
  }

  private getDomainAssignedEntitle (domainId) {
    this.masterSev.getEntitlementsByDomain(domainId).then((response: any) => {
      if (response) {
        this.AssignedFunctions = response;
      }
    });
  }

  private getDomainUnAssignedEntitle (domainId) {
    this.masterSev.getUnAssignEntitlementsByDomain(domainId).then((response: any) => {
      if (response) {
        this.AvailableFunctions = response;
        // this.entitlementConfig.records = response;
      }
    });

  }

  private addEntitlement (domainId, entitlements) {
    const req = {
      'domainId': domainId,
      'entitlementIds': entitlements
    };
    this.masterMngSev.createEntitlements(req).then((response: any) => {
      if (response) {
        console.log('Successfully added entitlements');
      }
    });
  }

  private deleteEntitlement (domainId, entitlements) {
    const req = {
      'domainId': domainId,
      'entitlementIds': entitlements
    };
    this.masterMngSev.deleteEntitlements(req).then((response: any) => {
      if (response) {
        console.log('Successfully deleted entitlements');
      }
    });
  }

  onClickAddNew () {
  }

  onClickCancel () {
    this.editDomainEntitlement = false;
    //  refresh buffers
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
    if (addEntIds.length !== 0) {
      this.addEntitlement(this.record.categoryId, addEntIds);
    }
    if (deleteEntIds.length !== 0) {
      this.deleteEntitlement(this.record.categoryId, deleteEntIds);
    }
    this.editDomainEntitlement = false;
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

  onChange (entitlement: any) {
    if (entitlement.isCheck) {
      entitlement.isCheck = false;
    } else {
      entitlement.isCheck = true;
    }

  }
}

