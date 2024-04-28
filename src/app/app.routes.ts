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
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { ClientComponent } from './components/client/client.component';

export const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: '', component: ApplicationComponent },
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
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'inbox', component: InboxComponent },
      { path: 'applications', component: ApplicationsComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'admin/inbox/:email', component: InboxComponent },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
