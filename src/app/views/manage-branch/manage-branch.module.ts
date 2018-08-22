import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBranchRoutingModule } from './manage-branch-routing.module';
import { ManageBranchComponent } from './manage-branch.component';
import { BranchListComponent } from './domain-entitlement-list/branch-list.component';
import {TabsModule} from 'ngx-bootstrap';
import {DataGridModule} from '../../shared/data-grid/data-grid.module';
import {FormsModule} from '@angular/forms';
import { FilterPipe } from './domain-entitlement-list/filter.pipe';
import { OrderBy} from './domain-entitlement-list/orderBy.pipe';


@NgModule({
  imports: [
    CommonModule,
    ManageBranchRoutingModule,
    TabsModule,
    DataGridModule,
    FormsModule
  ],
  declarations: [ManageBranchComponent, BranchListComponent, FilterPipe, OrderBy]
})
export class ManageBranchModule { }
