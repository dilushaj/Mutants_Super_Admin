import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import {CountryService, UsersService} from '../../../module-services';
import {BsModalService} from 'ngx-bootstrap/modal';
import {GlobalData, MainConfig, ToastNotificationService} from '../../../shared';
import {UserRolesService} from '../../../module-services/user-roles.service';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {CornerService} from '../../../module-services/corner.service';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { DatePipe } from '@angular/common';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: [],
  providers:[DatePipe]
})
export class UserFormComponent implements OnInit {

  userRoles: IMultiSelectOption[] = [];
  public userDetails: any = {};
  public countryList: any  = [];
  public formattedPhoneCode: String = '';
  minDate = new Date();
  user_availability = true;
  public cornerTypes: any = [];
  action: string;
  public onClose: Subject<boolean>;
  // settings configuration
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn-sm btn-default btn-block',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
  };

// Text configuration
  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find Select System Roles',
    defaultTitle: 'Please Select System Roles',
    allSelected: 'All selected',
  };


  constructor(public globalData: GlobalData, private modalService: BsModalService, private userSev: UsersService,
              private userRoleSev: UserRolesService, private countrySev: CountryService, private cornerSev: CornerService,
              public bsModalRef: BsModalRef, private datePipe: DatePipe, private toastNot: ToastNotificationService)
        {
          this.onClose = new Subject();
        }

  ngOnInit() {
    this.initUserRole();
    this.initCountryList();
    this.initCornerTypes();

    setTimeout(()=>{
      if(this.action == "edit"){
        this.initUserDetails();
      }else{
        this.userDetails = { countryId : "", dateOfBirth: new Date()};
      }
    },0);
  }

  private initUserDetails(){
    for(var key in this.cornerTypes){
      for(var i in this.cornerTypes[key].points) {
        switch (this.cornerTypes[key].key) {
          case 'PREPARATION':
            if (this.userDetails.preparationPoint === this.cornerTypes[key].points[i].shopCornerId){
              this.cornerTypes[key].selected = this.cornerTypes[key].points[i];
            }
            break;
          case 'SERVING_POINT':
            if (this.userDetails.servingPoint === this.cornerTypes[key].points[i].shopCornerId){
              this.cornerTypes[key].selected = this.cornerTypes[key].points[i];
            }
            break;
          case 'CONSUMING_POINT':
            if (this.userDetails.consumingPoint === this.cornerTypes[key].points[i].shopCornerId){
              this.cornerTypes[key].selected = this.cornerTypes[key].points[i];
            }
            break;
        }
      }
    }
    this.userDetails.formattedPhoneCode = this.userDetails.mobile.split('(')[0];
    this.userDetails.mobile = "(" + this.userDetails.mobile.split('(')[1] ;
    this.userDetails.dateOfBirth = new Date(this.userDetails.dateOfBirth);
  }

  private initUserRole(){
    this.userRoleSev.getUserRoles().then((response : any) => {
      if(response){
        this.userRoles = response;
      }
    });
  }

  private initCornerTypes() {
    for(let key in this.globalData.domainProperty.CORNER) {
      if(this.globalData.domainFeatures['USER_'+this.globalData.domainProperty.CORNER[key].KEY]){
        this.cornerTypes.push({
          key : this.globalData.domainProperty.CORNER[key].KEY,
          id: this.globalData.domainProperty.CORNER[key].ID,
          name: this.globalData.domainProperty.CORNER[key].NAME,
          points:[
            {
              "shopCornerId" : 0,
              "name" : "All"
            }
          ]
        });
      }
    }
    for(var key in this.cornerTypes){
      this.initWorkFlowPoints(this.cornerTypes[key].id,key);
    }
  }

  private initWorkFlowPoints(id, key) {
    let req = {
      "shopId": this.globalData.authObject.shopId,
      "branchId": this.globalData.authObject.branchId,
      "statuses": [MainConfig.STATUS_LIST.APPROVED.ID],
      "operators":["eq"],
      "searchKeys":["type"],
      "values":[id]
    };
    this.cornerSev.cornerFindByCriteria(req).then((response : any) => {
      if(response){
        for(var i in response.data){
          this.cornerTypes[key].points.push(response.data[i]);
        }
      }
    });
  }

  private initCountryList(){
    this.countrySev.getCountryList().then((response : any) => {
      if(response){
        this.countryList = response;
      }
    });
  }

  private changeCountry(countryId){
    for(let key in this.countryList){
      if(countryId == this.countryList[key].countryId){
        this.userDetails.formattedPhoneCode = '+ '+ this.countryList[key].phoneCode;
        break;
      }
    }
  }

  private onBlurUsername(username){
    if(username){
      let req = {
        "loginName": username
      };
      this.userSev.checkUserAvailability(req).then((response : any) => {
        if(response){
          this.user_availability = true;
        }else{
          this.user_availability = false;
        }
      });
    }
  }

  onSubmitAdmin(form: NgForm) {
    if(form.valid){
      const req = form.value;
      req.shopId = this.globalData.authObject.shopId;
      req.branchId = this.globalData.authObject.branchId;
      req.mobile = req.phoneCode+''+req.mobile;
      for(var key in this.cornerTypes){
        switch(this.cornerTypes[key].key){
          case 'PREPARATION':
            if(this.cornerTypes[key].selected){
              req.preparationPoint = this.cornerTypes[key].selected.shopCornerId;
            }
            break;
          case 'SERVING_POINT':
            if(this.cornerTypes[key].selected){
              req.servingPoint = this.cornerTypes[key].selected.shopCornerId;
            }
            break;
          case 'CONSUMING_POINT':
            if(this.cornerTypes[key].selected){
              req.consumingPoint = this.cornerTypes[key].selected.shopCornerId;
            }
            break;
        }
      }
      delete req.corner_;
      delete req.phoneCode;

      if(this.action === "add"){
        req.dateOfBirth = this.datePipe.transform(form.value.dateOfBirth, 'yyyy-MM-dd');
        this.userSev.createUser(req).then((response : any) => {
          if(response){
            this.toastNot.toastSuccess('Data has been saved successfully.');
            this.onClose.next(req);
            this.bsModalRef.hide();
          }
        });
      } else{
        req.adminId = this.userDetails.adminId;
        req.dateOfBirth = this.datePipe.transform(this.userDetails.dateOfBirth, 'yyyy-MM-dd');
        delete req.loginName;
        delete req.superAdmin;

        this.userSev.updateUser(req).then((response : any) => {
          if(response){
            this.toastNot.toastSuccess('Data has been updated successfully.');
            this.onClose.next(req);
            this.bsModalRef.hide();
          }
        });
      }
    }
  }

  cancel(){
    let response : any = this.userDetails;
    this.onClose.next(response);
    this.bsModalRef.hide();
  }

}
