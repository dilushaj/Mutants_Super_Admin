import {Component, OnInit, Input, ViewChild, OnChanges, EventEmitter, Output} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { MessageBoxConfirmComponent,ApiService, SevConfig, Config, ToastNotificationService } from './../../../shared';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: []
})
export class MessageViewComponent implements OnInit, OnChanges {
  @Input() formValue: any;
  @Input() action: string;
  @ViewChild('messageView') messageView: ModalDirective;
  @ViewChild('messageBoxConfirm') confirmMsg :MessageBoxConfirmComponent;
  @Output() onFormEvent: EventEmitter<any> = new EventEmitter();
  displayValue: any = {};
  config : any = {};

  msgBody : string = "";
  msgObject : any = {};
  constructor(private apiSev : ApiService, private toastNot:ToastNotificationService) { }

  ngOnInit() {
    this.config = Config;
  }
  ngOnChanges() {
    this.displayValue = this.formValue;
  }
  onViewModel() {
    this.messageView.show();
  }
  onCloseMessageViewModal(): void {
    this.messageView.hide();
  }
  onChangeStatus(status){
    if(this.config.STATUS_LIST.DELETED.ID == status){
      this.msgBody = "Are you sure you want to delete the message ?";
      this.msgObject = status;
      this.confirmMsg.onOpenMessageBox();
    }else{
      this.updateStatus(status);
    }
    }

  private updateStatus(status){
    let req = {
      "primaryId": this.formValue.messageId,
      "status": status
    };
    this.apiSev.httpPut(SevConfig.MESSAGE_SEV,"/update_status",req,null).then((data : any) => {
      if(data) {
        var obj = {
          "messageId": data.id,
          "status": data.status
        }
        this.toastNot.toastSuccess('Message status has been changed successfully.');
        this.onFormEvent.emit({action:this.action,record:Object.assign({},obj)});
        this.  onCloseMessageViewModal();
      }
    });
  }

  onMsgBoxEvent($event){
    if($event.value){
      this.updateStatus($event.object);
    }
  }
  }



