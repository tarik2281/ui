import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutUsComponent} from 'src/app/pages/about-us/about-us.component';
import {OverviewAppComponent} from 'src/app/pages/overview-app/overview-app.component';
import {OverviewSmarttubComponent} from 'src/app/pages/overview-smarttub/overview-smarttub.component';
import {RegisterUserComponent} from 'src/app/pages/register-user/register-user.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about-us'
  },
  {
    path: 'overview-smarttub',
    component: OverviewSmarttubComponent
  },
  {
    path: 'overview-app',
    component: OverviewAppComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'register',
    component: RegisterUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
