import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';
import {ApplicationComponent} from "./components/client/application/application.component";
import {LoginComponent} from "./components/login/login.component";

// admin:
import {DashboardComponent} from "./components/admin/dashboard/dashboard.component";
import {ApplicationsComponent} from "./components/admin/applications/applications.component";
import {InboxComponent} from "./components/admin/inbox/inbox.component";
import { MainPageComponent } from './components/client/application/main-page/main-page.component';
import { AccountComponent } from './components/client/application/account/account.component';
import { userGuard } from './core/guards/user.guard';
import { LeasesComponent } from './components/client/application/leases/leases.component';

export const routes: Routes = [
  {
    path: 'home',
    component: MainPageComponent,
    canActivate: [userGuard]
  },
  {
    path: 'lease/create',
    component: ApplicationComponent,
    canActivate: [userGuard]
  },
  {
    path: 'leases',
    component: LeasesComponent,
    canActivate: [userGuard]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [userGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
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
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
