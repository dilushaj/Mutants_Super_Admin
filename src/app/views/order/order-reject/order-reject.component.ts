import {Component, OnInit, Input, ViewChild, OnChanges, Output, EventEmitter, ViewContainerRef, ViewChildren, QueryList} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Config, SevConfig, ApiService, ToastNotificationService } from './../../../shared';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-reject',
  templateUrl: './order-reject.component.html',
  styleUrls: []
})
export class OrderRejectComponent implements OnInit, OnChanges {
  @Input() formValue: any;
  @Input() action: string;
  @Output() onFormEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('orderReject') orderReject: ModalDirective;
  @ViewChildren('f') f : QueryList<any>;

  displayValue: any = {};
  gridConfig: any = {};
  config: any = {};
  orderRejectRequired : any = {};
  comment: String;
  waitHttpResponse = false;

  private form : any;

  constructor(private apiSev: ApiService, private toastNot: ToastNotificationService, private vcr: ViewContainerRef) {
    toastNot.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.config = Config;
  }

  ngOnChanges() {
    this.displayValue = this.formValue;
  }

  onRejectModel() {
    this.orderReject.show();
  }

  onCloseOrderRejectModal(): void {
    this.orderReject.hide();
    if(this.form){
      try{this.form._results[0].resetForm();}catch(e){}
    }
  }

  ngAfterViewInit() {
    this.form = this.f;
  }

  onRejectOrder(form: NgForm) {
    if (form.valid) {
      let req = {
        "comments": this.orderRejectRequired.comment,
        "orderId": this.formValue.orderId
      }
      this.apiSev.httpPut(SevConfig.ORDER_SEV, "/reject", req, null).then((data: any) => {
        if (data) {
          var obj = {
            "orderId": data.id,
            "status": data.status
          }
          this.toastNot.toastSuccess('Order has been rejected successfully.');
          this.onFormEvent.emit({action: this.action, record: Object.assign({}, obj)});
        }
        this.onCloseOrderRejectModal();
        this.waitHttpResponse = false;
      }).catch((error: any) => {
        this.waitHttpResponse = false;
      });
    }
  }
}

