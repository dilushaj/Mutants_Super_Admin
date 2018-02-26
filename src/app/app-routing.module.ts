import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GuardService } from './shared';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    loadChildren: './views/views.module#ViewsModule',
    canActivate: [GuardService]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    loadChildren: './pages/pages.module#PagesModule'
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
