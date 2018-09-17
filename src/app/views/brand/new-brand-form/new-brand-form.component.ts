import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {NgForm, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {ApiService, GlobalData, MainConfig, GlobalFunction} from './../../../shared';
import {MasterDataService, MasterDataManagementService, AuthenticationService} from '../../../module-services';
import {CountryService} from '../../../module-services';
import {AppConfig, ToastNotificationService} from '../../../shared';


@Component({
  selector: 'app-new-brand-form',
  templateUrl: './new-brand-form.component.html',
  styleUrls: ['./new-brand-form.component.scss']
})
export class NewBrandFormComponent implements OnInit {
  public brand: any = {};
  public waitHttpResponse = false;
  public shopChategories = [];
  public onClose: Subject<boolean>;
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
    setTimeout(() => {

      if (this.action === 'edit') {
        this. initBrandDetails();
      }else {
        this.fileUploadConfig = {
          'width' : 200,
          'height' : 150,
          'shopId' : this.globalData.authObject.shopId,
          'type' : 'shop',
          'imgUrl' : AppConfig.IMAGE_URL,
          'image': this.imageURL
        };
        this.brand = {};
        this.openImage = true;
      }
    }, 0);
  }
  initBrandDetails() {
    if (this.brand.image !== '') {
      this.imageURL =  AppConfig.IMAGE_URL + this.brand.image;
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
    const response: any = this.brand;
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
        this.createBrand(this.brand);
      } else if (this.action === 'edit') {
        this.updateBrand(this.brand);
      }
    }
  }
  onClickReset(form: NgForm) {
    form.onReset();
  }
  private createBrand(brand: any) {
    this.masMngSev.addBrand(brand).then((response: any) => {
      if (response) {
        this.brand.statusName =  MainConfig.STATUS_LIST.PENDING.NAME;
        this.brand.shopCategoryName = this.comFun.mapShopCategory(this.shopChategories, brand.shopCategoryId);
        this.toastNot.toastSuccess('Brand Added Successfully.');
      } else {
        this.toastNot.toastSuccess('Error occured');
      }
    });
  }
  private updateBrand(brand: any) {
    this.masMngSev.updateBrand(brand).then((response: any) => {
      if (response) {
        this.toastNot.toastSuccess('Brand updated Successfully.');
      } else {
        this.toastNot.toastSuccess('Error occured');
      }
    });
  }
  onFileUploadEvent($event) {
    if ($event.type === 'uploaded') {
      this.brand.image = $event.data.fileName;
    } else if ($event.type === 'deleted') {
      this.brand.image = null;
    } else if ($event.type === 'error') {
      this.brand.image = null;
    }
  }

}
