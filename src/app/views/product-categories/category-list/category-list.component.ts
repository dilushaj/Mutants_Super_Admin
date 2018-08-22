import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { MasterDataService, MasterDataManagementService} from './../../../module-services';
import { NewCategoryFormComponent } from '../new-category-form/new-category-form.component';
import { AppConfig, MainConfig, GlobalFunction, GlobalData, MessageBoxConfirmComponent } from './../../../shared';

@Component({
  selector: 'app-corner-list',
  templateUrl: './category-list.component.html',
  styleUrls: []
})
export class CategoryListComponent implements OnInit {
  bsModalRef: BsModalRef;
  public gridConfig: any = {};
  private sveReq: any = {};
  private isCheck = true;
  public selectedRows = 0;
  public categoryDetails = {};
  public STATUS_LIST = MainConfig.STATUS_LIST;
  private shopCategories = [];
  action: string;

  constructor(
    private modalService: BsModalService,
    private masterService: MasterDataService,
    private masterMngService: MasterDataManagementService,
    public globalData: GlobalData,
    private comFun: GlobalFunction
  ) {
  this.getShopCategories();
  }

  ngOnInit() {
    this.initGridConfig();
    this.initFindByReq();
    this.getProductCategoriesFindByCriteria();
  }

  private getShopCategories () {
    this.masterService.getShopCategories().then((response: any) => {
      if (response) {
        this.shopCategories = response;
        console.log('Shop chatogories successfully taken');
      } else {
        console.log('Error occured');
      }
    });
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

  private editRow(record: any) {
    this.action = 'edit';
    this.categoryDetails = Object.assign({}, record);
     this.openNewShopModel();
  }

  private gridRefresh() {
    this.initFindByReq();
    this.getProductCategoriesFindByCriteria();
  }

  private gridSort(sort: any) {
    this.sveReq.orderByKey = sort.key;
    this.sveReq.orderByValue = sort.value;
    this.getProductCategoriesFindByCriteria();
  }

  private gridPageChange(pagination: any) {
    this.sveReq.offset = (pagination.page - 1) * pagination.itemsPerPage;
    this.sveReq.limit = pagination.itemsPerPage;
    this.getProductCategoriesFindByCriteria();
  }

  private gridFilter(filter: any) {
    this.sveReq.operators = [];
    this.sveReq.searchKeys = [];
    this.sveReq.values = [];
    this.sveReq.offset = 0;
    this.sveReq.limit = this.gridConfig.pagination.itemsPerPage;
    for (let i = 0; i < filter.length; i++) {
      if (filter[i].key === 'statusName') {
        filter[i].key = 'status';
        filter[i].value = parseInt(filter[i].value);
      }else if (filter[i].key === 'value') {
        filter[i].key = 'value';
        filter[i].value = filter[i].value;
      }else if (filter[i].key === 'shopTypeName') {
        filter[i].key = 'shopTypeId';
        filter[i].value = parseInt(filter[i].value);
      }
      this.sveReq.operators.push(filter[i].operators);
      this.sveReq.searchKeys.push(filter[i].key);
      this.sveReq.values.push(filter[i].value);
    }
    this.getProductCategoriesFindByCriteria();
  }

  private checkList() {
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
  private getProductCategoriesFindByCriteria() {
    this.selectedRows = 0;
    this.gridConfig.records = [];
    this.gridConfig.waitingHttpSve = true;
    this.masterService.getProductCategories(this.sveReq).then((response: any) => {
      if (response) {
        this.gridConfig.records = response.data;
        this.gridConfig.records.forEach((obj: any) => {
          obj.shopCategoryName = this.comFun.mapShopCategory(this.shopCategories, obj.shopCategoryId);
        });
        this.gridConfig.pagination.bigTotalItems = response.recordCount;
      } else if (response === null) {
        this.initFindByReq();
      }
      this.gridConfig.waitingHttpSve = false;
    });
  }

  private initFindByReq() {
    this.sveReq = {
      'statuses': [
        MainConfig.STATUS_LIST.PENDING.ID,
        MainConfig.STATUS_LIST.APPROVED.ID,
        MainConfig.STATUS_LIST.SUSPENDED.ID
      ],
      'offset': 0,
      'limit': this.gridConfig.pagination.itemsPerPage,
      'orderByKey': 'categoryId',
      'orderByValue': 'asc',
      'searchKeys': [],
      'operators': [],
      'values': []
    };
  }

  private initGridConfig() {

    this.gridConfig = {
      pagination : {
        maxSize : 5,
        bigTotalItems : 0,
        bigCurrentPage : 1,
        itemsPerPage : 50
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
          'name': 'Id',
          'key': 'categoryId',
          'column_type': 'data',
          'head_align': 'text-center',
          'data_align': 'text-center',
          'width': 40
        },
        // {
        //   'name': 'Name',
        //   'key': 'name',
        //   'column_type': 'data',
        //   'head_align': 'text-left',
        //   'data_align': 'left',
        //   'sort': true,
        //   'filter': true,
        //   'filterConfig': {
        //     'operators': {
        //       'like': true
        //     },
        //     'selected_operator': 'like',
        //     'type': 'text',
        //   },
        //   'width': 100
        // },
        {
          'name': 'Shop Type',
          'key': 'shopTypeName',
          'column_type': 'data',
          'head_align': 'text-left',
          'data_align': 'left',
          'width': 100,
          // 'sort': true,
          'filter': true,
          'filterConfig': {
            'operators': {
              'eq': true
            },
            'selected_operator': 'eq',
            'type': 'option',
            'options': [
              {text: MainConfig.SHOP_TYPES['1'], value: '1'},
              {text: MainConfig.SHOP_TYPES['2'], value: '2'}
            ]
          }
        },
        {
          'name': 'Shop Category',
          'key': 'shopCategoryName',
          'width': 300,
          'column_type': 'data',
          'data_align': 'left',
          // 'sort': true,
          // 'filter': true,
          // 'filterConfig': {
          //   'operators': {
          //     'like': true
          //   },
          //   'selected_operator': 'like',
          //   'type': 'option'
          // }
        },
        {
          'name': 'Data Type',
          'key': 'dataTypeName',
          'width': 100,
          'column_type': 'data',
          'data_align': 'center',
          // 'sort': true,
          // 'filter': true,
          // 'filterConfig': {
          //   'operators': {
          //     'like': true
          //   },
          //   'selected_operator': 'like',
          //   'type': 'option'
          // }
        },
        {
          'name': 'Category Type',
          'key': 'type',
          'width': 100,
          'column_type': 'data',
          'data_align': 'left',
          // 'sort': true,
          // 'filter': true,
          // 'filterConfig': {
          //   'operators': {
          //     'like': true
          //   },
          //   'selected_operator': 'like',
          //   'type': 'option'
          // }
        },
        {
          'name': 'Is Parent',
          'key': 'parent',
          'width': 100,
          'column_type': 'data',
          'data_align': 'left',
          // 'sort': true,
          // 'filter': true,
          // 'filterConfig': {
          //   'operators': {
          //     'like': true
          //   },
          //   'selected_operator': 'like',
          //   'type': 'option'
          // }
        },
        {
          'name': 'Parent Category',
          'key': 'parentCategoryId', // --------------------check
          'width': 100,
          'column_type': 'data',
          'data_align': 'center',
          // 'sort': true,
          // 'filter': true,
          // 'filterConfig': {
          //   'operators': {
          //     'like': true
          //   },
          //   'selected_operator': 'like',
          //   'type': 'option'
          // }
        },
        {
          'name': 'Value',
          'key': 'value',
          'width': 200,
          'column_type': 'data',
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
        // {
        //   'name': '',
        //   'key': 'view',
        //   'title': 'View',
        //   'column_type': 'action',
        //   'data_align': 'center',
        //   'btn_type': 'btn-info',
        //   'icon': 'fa-eye',
        //   'width': 35
        // },
      ],
      records: []
    };
  }

  onClickAddBtn () {
    this.action = 'edit';
    this.categoryDetails = {};
    this.openNewShopModel();
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
    this.bsModalRef = this.modalService.show(NewCategoryFormComponent, modelConfig);
    this.bsModalRef.content.action = this.action;
    console.log(this.categoryDetails);
    this.bsModalRef.content.categoryDetails = this.categoryDetails;
    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('results', result);
    });
  }
  public onConfirmUpdateStatus (statusDetails, status) {
    // prompt the delete staus message box
    // onUpdateStatus (statusDetails, status)
  }
  public onUpdateStatus (statusDetails, status) {
    for (let i = 0; i < this.gridConfig.records.length; i++) {
      if (this.gridConfig.records[i].isCheck) {
        this.updateStatus(this.gridConfig.records[i], statusDetails.ID);
      }
    }
  }
  private updateStatus (record, StatusId) {
    const req = {
      'primaryId': record.categoryId,
      'status': StatusId
    };
    this.masterMngService.updateCategoryStatus(req).then((response: any) => {
      if (response) {
        this.getProductCategoriesFindByCriteria();
        this.getGridRow(record);
      }
    });
  }
  private getGridRow (record) {
    for (let i = 0; i < this.gridConfig.records.length; i++) {
      if (this.gridConfig.records[i].categoryId === record.categoryId) {
        this.updateGridRow(this.gridConfig.records[i]);
        break;
      }
    }
  }
  private updateGridRow (updatedData: any) {
    for (let i = 0; i < this.gridConfig.records.length; i++) {
      if (this.gridConfig.records[i].categoryId === updatedData.categoryId) {
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

}
