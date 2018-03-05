import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MessageListComponent } from './message-list.component';
import { DataGridModule } from './../../../shared';
import { MessageViewModule } from './../message-view/message-view.module';

@NgModule({
  imports: [
    CommonModule, DataGridModule, TranslateModule, MessageViewModule
  ],
  declarations: [MessageListComponent],
  exports: [MessageListComponent],
  providers: []
})
export class MessageListModule { }



