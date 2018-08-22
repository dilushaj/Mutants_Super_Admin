import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManageBranchComponent} from "./manage-branch.component";
import {BranchListComponent} from "./domain-entitlement-list/branch-list.component";

const routes: Routes = [
  {
    path: '',
    component: ManageBranchComponent,
    data: {
      title: 'Branch'
    },
    children: [
      { path: 'branches', component:BranchListComponent },
      // { path: 'info', component: ShopInfoViewComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBranchRoutingModule {

}
