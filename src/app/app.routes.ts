import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {ApplicationsComponent} from "./admin/applications/applications.component";
import {InboxComponent} from "./admin/inbox/inbox.component";
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'admin/applications',
    component: ApplicationsComponent,
  },
  {
    path: 'admin/inbox',
    component: InboxComponent,
  }
];
