import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SalesComponent } from './sales/sales.component';
import { NewProductComponent } from './sales/new-product/new-product.component';
// import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  // { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: '', component: AuthComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'new-product', component: NewProductComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
