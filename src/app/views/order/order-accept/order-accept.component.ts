import {Component, OnInit, Input, ViewChild, OnChanges, ViewContainerRef, Output, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Config, SevConfig, ApiService, ComFunction, ToastNotificationService } from './../../../shared';

@Component({
  selector: 'app-order-accept',
  templateUrl: './order-accept.component.html',
  styleUrls: []
})
export class OrderAcceptComponent implements OnInit, OnChanges  {
  @Input() formValue: any;
  @Input() action: string;
  @Output() onFormEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('orderAccept') orderAccept: ModalDirective;
  displayValue: any = {};
  gridConfig : any = {};
  config : any = {};
  comment : String;
  waitHttpResponse = false;

  constructor(private apiSev : ApiService, private toastNot:ToastNotificationService, private vcr: ViewContainerRef, private comFun : ComFunction) {
    toastNot.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.config = Config;
  }
  ngOnChanges() {
    this.displayValue = this.formValue;
  }

  onAcceptModel() {
    this.orderAccept.show();
  }
  onCloseOrderAcceptModal(): void {
    this.orderAccept.hide();
  }
  onAcceptOrder(){
    let req = {
      "comments": this.comment,
      "orderId": this.formValue.orderId
    }
    this.apiSev.httpPut(SevConfig.ORDER_SEV,"/accept",req,null).then((data : any) => {
      if(data) {
        var obj = {
          "orderId": data.id,
          "status": data.status
        }
        this.toastNot.toastSuccess('Order has been accepted successfully.');
        this.onFormEvent.emit({action:this.action,record:Object.assign({},obj)});
      }
      this.onCloseOrderAcceptModal();
      this.waitHttpResponse = false;
    }).catch((error : any) => { this.waitHttpResponse = false; });
    }
  }

