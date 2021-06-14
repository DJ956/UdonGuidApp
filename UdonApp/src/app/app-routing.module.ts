import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommentPage } from './presentation/AddCommentPage/AddCommentPage/AddCommentPage.component';
import { HomePage } from './presentation/HomePage/HomePage/HomePage';
import { LogInPage } from './presentation/LogInPage/LogInPage/LogInPage.component';
import { ShopDetailPage } from './presentation/ShopDetailPage/ShopDetailPage/ShopDetailPage.component';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'shopDetail', component: ShopDetailPage },
  { path: 'addComment', component: AddCommentPage },
  { path: 'login', component: LogInPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
