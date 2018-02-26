import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MessageBoxConfirmComponent } from './message-box-confirm.component';

@NgModule({
  imports: [
    CommonModule, ModalModule.forRoot(), TranslateModule
  ],
  declarations: [MessageBoxConfirmComponent],
  exports: [MessageBoxConfirmComponent]
})
export class MessageBoxModule { }
