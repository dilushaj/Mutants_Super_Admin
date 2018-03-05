import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MessageBoxModule } from './../../../shared';
import { MessageViewComponent } from './message-view.component';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), TranslateModule, MessageBoxModule
  ],
  declarations: [MessageViewComponent],
  exports: [MessageViewComponent]
})
export class MessageViewModule { }
