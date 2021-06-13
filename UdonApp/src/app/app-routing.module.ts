import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommentPage } from './presentation/AddCommentPage/AddCommentPage/AddCommentPage.component';
import { HomePage } from './presentation/HomePage/HomePage/HomePage';
import { ShopDetailPage } from './presentation/ShopDetailPage/ShopDetailPage/ShopDetailPage.component';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'shopDetail', component: ShopDetailPage },
  { path: 'addComment', component: AddCommentPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
