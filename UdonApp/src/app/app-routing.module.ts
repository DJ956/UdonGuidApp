import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './presentation/HomePage/HomePage/HomePage';
import { ShopDetailPage } from './presentation/ShopDetailPage/ShopDetailPage/ShopDetailPage.component';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'shopDetail', component: ShopDetailPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
