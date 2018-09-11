import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {NgForm, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {ApiService, GlobalData, MainConfig, GlobalFunction} from './../../../shared';
import {MasterDataService, MasterDataManagementService, AuthenticationService} from '../../../module-services';
import {CountryService} from '../../../module-services';
import {AppConfig, ToastNotificationService} from '../../../shared';


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
  public fileUploadConfig: any = {};
  action: string;
  public imageURL: any = null;
  public openImage = false;
  constructor(public bsModalRef: BsModalRef,
              private modalService: BsModalService,
              private apiSev: ApiService,
              private globalData: GlobalData,
              private masterSev: MasterDataService,
              private masMngSev: MasterDataManagementService,
              private authSev:  AuthenticationService,
              private countrySev: CountryService,
              private toastNot: ToastNotificationService,
              private fb: FormBuilder,
              private comFun: GlobalFunction) {
    this.onClose = new Subject();
    this.getShopChatagories();
  }

  ngOnInit() {

    this.Data_Types = [{'dataType': 1, 'TypeValue': MainConfig.SHOP_DATA_TYPES['1']}, {'dataType': 2, 'TypeValue': MainConfig.SHOP_DATA_TYPES['2']}];
    this.Shop_Types = [{'shopTypeId': 1, 'TypeName': MainConfig.SHOP_TYPES['1']}, {'shopTypeId': 2, 'TypeName': MainConfig.SHOP_TYPES['2']}];
    setTimeout(() => {

      if (this.action === 'edit') {
        this. initCategoryDetails();
      }else {
        this.fileUploadConfig = {
          'width' : 200,
          'height' : 150,
          'shopId' : this.globalData.authObject.shopId,
          'type' : 'shop',
          'imgUrl' : AppConfig.IMAGE_URL,
          'image': this.imageURL
        };
        this.category = {};
        this.openImage = true;
      }
    }, 0);
  }


  initCategoryDetails() {
    if (this.category.parentCategoryId === 0) {
      this.categoryType = 1;
    }else {
      this.categoryType = 2;
      this.onChangeGetParentCategories();
    }
    if (this.category.image !== '') {
      this.imageURL =  AppConfig.IMAGE_URL + this.category.image;
    }
    this.fileUploadConfig = {
      'width' : 200,
      'height' : 150,
      'shopId' : this.globalData.authObject.shopId,
      'type' : 'shop',
      'imgUrl' : AppConfig.IMAGE_URL,
      'image': this.imageURL
    };
    this.openImage = true;
  }


  onCloseModal() {
    console.log(this.category);
    const response: any = this.category;
    this.onClose.next(response);
    this.bsModalRef.hide();
  }
  private getShopChatagories() {
    this.masterSev.getShopCategories().then((response: any) => {
      if (response) {
        this.shopChategories = response;
        console.log('Shop chatogories successfully taken');
      } else {
        console.log('Error occured');
      }
    });
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.action === 'add') {
        this.createCategory(this.category);
      } else if (this.action === 'edit') {
        this.updateCategory(this.category);
      }
    }
  }
  onClickReset(form: NgForm) {
    form.onReset();
  }
  private createCategory(category: any) {
    this.masMngSev.addProductCategory(category).then((response: any) => {
      if (response) {
        this.category.categoryId = response.id;
        this.category.statusName =  MainConfig.STATUS_LIST.PENDING.NAME;
        this.category.shopTypeName = MainConfig.SHOP_TYPES[this.category.shopTypeId.toString()];
        this.category.shopCategoryName = this.comFun.mapShopCategory(this.shopChategories, category.shopCategoryId);
        this.category.dataTypeName = MainConfig.SHOP_DATA_TYPES[this.category.dataType.toString()];
        this.toastNot.toastSuccess('Category Added Successfully.');
      } else {
        this.toastNot.toastSuccess('Error occured');
      }
    });
  }
  private updateCategory(category: any) {
    this.masMngSev.updateProductCategory(category).then((response: any) => {
      if (response) {
        this.toastNot.toastSuccess('Category updated Successfully.');
      } else {
        this.toastNot.toastSuccess('Error occured');
      }
    });
  }


  onFileUploadEvent($event) {
    if ($event.type === 'uploaded') {
      this.category.image = $event.data.fileName;
    } else if ($event.type === 'error') {
      this.category.image = null;
    }
  }
  onChangeGetParentCategories() {
    this.Parent_Category_Types = [];
    if (this.categoryType === 1) {
      this.category.parentCategoryId = 0;
    } else {
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
}
