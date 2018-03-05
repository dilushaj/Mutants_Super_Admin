import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManageUserComponent} from './manage-user.component';
import {UsersComponent} from './users/users.component';
import {UserRolesComponent} from './user-roles/user-roles.component';

const routes: Routes = [
  {
    path: '',
    component: ManageUserComponent,
    data: {
      title: 'Users'
    },
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'user-roles', component: UserRolesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }
