import { Routes } from '@angular/router';
import { loginGuard } from './auth/guards/login.guard';
import { ApplicationComponent } from './components/client/application/application.component';
import { LoginComponent } from './components/shared/login/login.component';

// admin:
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ApplicationsComponent } from './components/admin/applications/applications.component';
import { InboxComponent } from './components/admin/inbox/inbox.component';
import { OverviewComponent } from './components/overview/overview.component';

export const routes: Routes = [
  {
    path: '',
    component: ApplicationComponent,
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
    path: 'test',
    component: OverviewComponent,
  },
];
