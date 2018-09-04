import { Component, OnInit, Input, Output, ViewChild, OnChanges, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'message-box-confirm-view',
  templateUrl: './message-box-confirm.component.html',
  styleUrls: ['./message-box.scss']
})
export class MessageBoxConfirmComponent implements OnInit, OnChanges {
  @Input() body : any;
  @Input() object : any;
  @ViewChild('messageBoxConfirm') messageBoxConfirm: ModalDirective;
  @Output() onMsgBoxEvent: EventEmitter<any> = new EventEmitter();
  displayValue : any = {};

  constructor() {
  }

  ngOnInit() {
    console.log('came here as well');
    console.log(this.messageBoxConfirm);
    console.log(this.body);
    console.log(this.object);
    // this.onOpenMessageBox();
  }

  ngOnChanges() {
  }

  onOpenMessageBox() {
    this.messageBoxConfirm.show();
  }

  onCloseMessageBoxModal(): void {
    this.messageBoxConfirm.hide();
  }

  onNoClick() {
    this.onMsgBoxEvent.emit({value:false,object:this.object});
    this.messageBoxConfirm.hide();
  }

  onYesClick() {
    this.onMsgBoxEvent.emit({value:true,object:this.object});
    this.messageBoxConfirm.hide();
  }

}
