import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoriesComponent } from './product-categories.component';
import { CategoryListComponent } from './category-list/category-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProductCategoriesComponent,
    data: {
      title: 'Product-Categories'
    },
    children: [
      { path: 'details', component: CategoryListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoriesRoutingModule {}
