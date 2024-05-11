import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { ErrorComponent } from './core/components/error/error.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { LayoutComponent } from './core/components/layout/layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '', component: LayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent }
    ]
  },
  { path: '**', component: ErrorComponent }
];
