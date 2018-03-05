// import {Component, OnInit, Output, EventEmitter, Input, OnChanges, ViewChildren, QueryList, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
// import {DatePipe} from "@angular/common";
// import {ApiService} from "../../../shared/services/api.service";
// import {ToastNotificationService} from "../../../shared/services/toast-notification.service";
// import {ModalDirective} from "ngx-bootstrap/modal";

import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ViewChildren, QueryList, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
//import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { SevConfig, ApiService, ToastNotificationService } from './../../../shared';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
   styleUrls: []
})
export class CustomerFormComponent implements OnInit , OnChanges, AfterViewInit {

  @Input() formValue : any;
  @Input() countryList : any = [];
  @Input() action : string;
  @Output() onFormEvent: EventEmitter<any> = new EventEmitter();
  @ViewChildren('f') f : QueryList<any>;
  @ViewChild('customerForm') customerForm: ModalDirective;
  adminUser : any = {};
  maxDate = new Date();
  newVar: Date = new Date();
  private _bsValue : Date;
  private form : any;
  modelConfig = {
    animated : true,
    keyboard : true,
    backdrop : true,
    ignoreBackdropClick : true
  };
  user_availability = true;
  waitHttpResponse = false;

  constructor(private datePipe: DatePipe, private apiSev : ApiService, private toastNot:ToastNotificationService, private vcr: ViewContainerRef) {
    toastNot.setRootViewContainerRef(vcr);
  }

  get bsValue(): Date {
    return this._bsValue;
  }

  ngAfterViewInit() {
    this.form = this.f;
  }

  ngOnInit() {

  }

  ngOnChanges() {
    if(this.action === "add"){
      this.adminUser = { countryId : "" };
    }else{
      this.adminUser = Object.assign({},this.formValue);
    }
  }

  onAddNew(){
    this.customerForm.show();
  }

  onCloseAdminFormModal(): void {
    this.customerForm.hide();
    if(this.form){
      try{this.form._results[0].resetForm();}catch(e){}
    }
  }

  onBlurUsername(loginName){
    if(loginName){
      let req = {
        "loginName": loginName
      };
      this.apiSev.httpPut(SevConfig.ADMIN_SEV,"/check_availability",req,null).then((data : any) => {
        //console.log(data.success);
      }).catch((error : any) => {
        this.user_availability = false;
      });
    }
  }

  onSubmit(form: NgForm) {
    if(form.valid){
      const req = form.value;
      req.dateOfBirth = this.datePipe.transform(form.value.dateOfBirth, 'yyyy-MM-dd');
      //console.log(req);
      this.waitHttpResponse = true;
      if(this.action === "add"){
        this.apiSev.httpPost(SevConfig.ADMIN_SEV,"",req,null).then((data : any) => {
          if(data){
            this.toastNot.toastSuccess('Data has been saved successfully.');
            this.onFormEvent.emit({action:this.action,record:data.data});
          }
          this.onCloseAdminFormModal();
          this.waitHttpResponse = false;
        }).catch((error : any) => { this.waitHttpResponse = false; });
      }else{
        req.adminId = this.adminUser.adminId;
        delete req.loginName;
        this.apiSev.httpPut(SevConfig.ADMIN_SEV,"",req,null).then((data : any) => {
          if(data){
            this.toastNot.toastSuccess('Data has been updated successfully.');
            this.onFormEvent.emit({action:this.action,record:Object.assign({},req)});
          }
          this.onCloseAdminFormModal();
          this.waitHttpResponse = false;
        }).catch((error : any) => { this.waitHttpResponse = false; });
      }
    }
  }

  onClickReset(form: NgForm) {
    if(this.action === "add"){
      form.resetForm();
    }else{
      this.adminUser = Object.assign({},this.formValue);
    }
  }

}
