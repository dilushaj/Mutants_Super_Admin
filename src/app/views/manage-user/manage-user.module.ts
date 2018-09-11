import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUserRoutingModule } from './manage-user-routing.module';
import { ManageUserComponent } from './manage-user.component';
import { UsersComponent } from './users/users.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {DataGridModule, MessageBoxModule, FileUploadModule} from '../../shared';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {NgxMaskModule} from 'ngx-mask';
import { UserViewComponent } from './user-view/user-view.component';

@NgModule({
  imports: [
    CommonModule,
    ManageUserRoutingModule,
    TabsModule,
    MessageBoxModule,
    FileUploadModule,
    DataGridModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    MultiselectDropdownModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [ManageUserComponent, UsersComponent, UserRolesComponent, UserFormComponent, UserViewComponent],
  entryComponents: [
    UserFormComponent,
    UserViewComponent
  ]
})
export class ManageUserModule { }
