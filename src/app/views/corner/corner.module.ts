import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule }   from '@angular/forms';

import { MessageBoxModule, DataGridModule } from './../../shared';
import { CornerRoutingModule } from './corner-routing.module';
import { CornerComponent } from './corner.component';
import { CornerListComponent } from './corner-list/corner-list.component';

@NgModule({
  imports: [
    CommonModule,
    CornerRoutingModule,
      ModalModule.forRoot(), FormsModule,
      TabsModule,
      MessageBoxModule,
      DataGridModule
  ],
  declarations: [CornerComponent, CornerListComponent]
})
export class CornerModule { }
