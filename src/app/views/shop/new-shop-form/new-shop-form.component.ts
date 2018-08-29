import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {NgForm, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {ApiService, GlobalData} from './../../../shared';
import {ShopService, AuthenticationService} from '../../../module-services';
import {CountryService} from '../../../module-services';
import {Md5} from 'ts-md5/dist/md5';
import { ToastNotificationService } from '../../../shared';

@Component({
  selector: 'app-new-shop-form',
  templateUrl: './new-shop-form.component.html',
  styleUrls: []
})
export class NewShopFormComponent implements OnInit {
  public shop: any = {};
  public waitHttpResponse = false;
  public countryList = [];
  public shopChategories = [];
  public currencyList = [];
  public onClose: Subject<boolean>;
  f: FormGroup;
  public isValidLoginName= false;

  constructor(public bsModalRef: BsModalRef,
              private modalService: BsModalService,
              private apiSev: ApiService,
              private globalData: GlobalData,
              private shopSev: ShopService,
              private authSev:  AuthenticationService,
              private countrySev: CountryService,
              private toastNot: ToastNotificationService,
              private fb: FormBuilder
  ) {
    this.onClose = new Subject();
  }

  ngOnInit() {
    this.getShopChatagories();
    this.getCountryList();
    this.getCurrencyList();
  }

  onCloseModal() {
    const response: any = this.shop;
    this.onClose.next(response);
    this.bsModalRef.hide();
  }


  onSubmit() {
    this.shop.password = Md5.hashStr(this.shop.password);
    this.addShop(this.shop);
  }

  onClickReset(form: NgForm) {
    form.onReset();
  }
  private onTypeCheckAvailability(loginName: string) {
    this.authSev.checkLoginNameAvailablity(loginName).then((response: any) => {
      if (response) {
        this.isValidLoginName = response;
      }
    });
  }

  private addShop(req: any) {
    this.shopSev.createShop(req).then((response: any) => {
      if (response) {
        this.toastNot.toastSuccess('Shop Created Successfully.');
      } else {
        this.toastNot.toastSuccess('Error occured');
      }
    });
  }

  private getShopChatagories() {
    this.shopSev.getShopChatogories().then((response: any) => {
      if (response) {
        this.shopChategories = response;
        console.log('Shop chatogories successfully taken');
      } else {
        console.log('Error occured');
      }
    });
  }

  private getCountryList() {
    this.countrySev.getCountryList().then((response: any) => {
      if (response) {
        this.countryList = response;
      } else {
        console.log('Eroor');
      }
    });
  }

  private getCurrencyList() {
    this.countrySev.getCurrencyList().then((response: any) => {
      if (response) {
        this.currencyList = response;
      } else {
        console.log('Error');
      }
    });
  }

}
