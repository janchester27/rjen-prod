import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../features/auth/login/login.component';
import { MainComponent } from './core/main/main.component';
import { PointOfSalesComponent } from '../features/point-of-sales/point-of-sales.component';
import { ResetPasswordComponent } from '../features/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: MainComponent, children: [
    {path: 'pos', component: PointOfSalesComponent},
    {path: 'reset-password', component: ResetPasswordComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
