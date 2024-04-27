import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';
import { ApplicationComponent } from './components/client/application/application.component';
import { LoginComponent } from './components/login/login.component';
import { ApplicationsComponent } from './components/admin/applications/applications.component';
import { InboxComponent } from './components/admin/inbox/inbox.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ClientComponent } from './components/client/client.component';
import { SubmissionConfirmationComponent } from "./components/client/submission-confirmation/submission-confirmation.component";

export const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: '', component: ApplicationComponent }
    ]
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
      {path: 'inbox', component: InboxComponent},
      {path: 'applications', component: ApplicationsComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'admin/inbox/:email', component: InboxComponent}
    ]
  },
  {
    path: 'submission-confirmation', component: SubmissionConfirmationComponent
  }
];
