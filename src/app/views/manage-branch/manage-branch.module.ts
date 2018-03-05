import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBranchRoutingModule } from './manage-branch-routing.module';
import { ManageBranchComponent } from './manage-branch.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import {TabsModule} from "ngx-bootstrap";
import {DataGridModule} from "../../shared/data-grid/data-grid.module";

@NgModule({
  imports: [
    CommonModule,
    ManageBranchRoutingModule,
    TabsModule,
    DataGridModule
  ],
  declarations: [ManageBranchComponent, BranchListComponent]
})
export class ManageBranchModule { }
