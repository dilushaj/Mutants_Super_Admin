import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUserRoutingModule } from './manage-user-routing.module';
import { ManageUserComponent } from './manage-user.component';
import { UsersComponent } from './users/users.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {DataGridModule, MessageBoxModule} from '../../shared';
import { UserRolesComponent } from './user-roles/user-roles.component';

@NgModule({
  imports: [
    CommonModule,
    ManageUserRoutingModule,
    TabsModule,
    MessageBoxModule,
    DataGridModule
  ],
  declarations: [ManageUserComponent, UsersComponent, UserRolesComponent]
})
export class ManageUserModule { }
