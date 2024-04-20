import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
//import {AdminComponent} from "./admin-dashboard/admin.component";
import { loginGuard } from '../guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  // {
  //   path: 'admin-dashboard',
  //   component: AdminComponent,
  // }
];
