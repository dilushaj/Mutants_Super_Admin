import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {NgForm, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {ApiService, GlobalData, MainConfig} from './../../../shared';
import {MasterDataService, MasterDataManagementService, AuthenticationService} from '../../../module-services';
import {CountryService} from '../../../module-services';
import { ToastNotificationService } from '../../../shared';


@Component({
  selector: 'app-new-category-form',
  templateUrl: './new-category-form.component.html',
  styleUrls: ['./new-category-form.component.scss']
})
export class NewCategoryFormComponent implements OnInit {
  public category: any = {};
  public waitHttpResponse = false;
  public shopChategories = [];
  public onClose: Subject<boolean>;
  public Data_Types = []; // MainConfig.SHOP_DATA_TYPES;
  public Shop_Types = []; // MainConfig.SHOP_TYPES;
  public Product_Category_Types= MainConfig.PRODUCT_CATEGORY_TYPES;
  public Category_Types = MainConfig.CATEGORY_TYPES;
  public categoryType: any;
  public Parent_Category_Types = [];
  constructor(public bsModalRef: BsModalRef,
              private modalService: BsModalService,
              private apiSev: ApiService,
              private globalData: GlobalData,
              private masterSev: MasterDataService,
              private masMngSev: MasterDataManagementService,
              private authSev:  AuthenticationService,
              private countrySev: CountryService,
              private toastNot: ToastNotificationService,
              private fb: FormBuilder) {
    this.onClose = new Subject();
  }

  ngOnInit() {
    this.getShopChatagories();
    this.Data_Types = [{'dataType': 1, 'TypeValue': MainConfig.SHOP_DATA_TYPES['1']}, {'dataType': 2, 'TypeValue': MainConfig.SHOP_DATA_TYPES['2']}];
    this.Shop_Types = [{'shopTypeId': 1, 'TypeName': MainConfig.SHOP_TYPES['1']}, {'shopTypeId': 2, 'TypeName': MainConfig.SHOP_TYPES['2']}];
  }
  onCloseModal() {
    const response: any = this.category;
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
  private getShopChatagories() {
    this.masterSev.getShopCategories().then((response: any) => {
      if (response) {
        this.shopChategories = response;
        this.shopChategories.forEach((obj: any) => {
          console.log(obj.name);
        });
        console.log('Shop chatogories successfully taken');
      } else {
        console.log('Error occured');
      }
    });
  }
  onSubmit() {
  this.createCategory(this.category);
  }
  onClickReset(form: NgForm) {
    form.onReset();
  }
  private createCategory(category: any) {
    this.masMngSev.addProductCategory(category).then((response: any) => {
      if (response) {
        this.toastNot.toastSuccess('Category Added Successfully.');
      } else {
        this.toastNot.toastSuccess('Error occured');
      }
    });
  }
  onChangeGetParentCategories() {
    this.category.parentCategoryId = 0;
    this.Parent_Category_Types = [];
    if (this.categoryType === 2) {
      const req = {
        'statuses': [
          MainConfig.STATUS_LIST.APPROVED.ID
        ],
        'offset': 0,
        'limit': 999,
        'orderByKey': 'categoryId',
        'orderByValue': 'asc',
        'searchKeys': ['parent'],
        'operators': ['eq'],
        'values': [true]
      };
      if (this.category.shopCategoryId) {
        req.searchKeys.push('shopCategoryId');
        req.operators.push('eq');
        req.values.push(this.category.shopCategoryId);
      }
      if (this.category.shopTypeId) {
        req.searchKeys.push('shopTypeId');
        req.operators.push('eq');
        req.values.push(this.category.shopTypeId);
      }
      this.masterSev.getProductCategories(req).then((response: any) => {
        if (response) {
          this.Parent_Category_Types = response.data;
        }
      });
    }
  }
}
