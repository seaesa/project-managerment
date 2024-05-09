import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signupp', component: SignupComponent },
  {
    path: '', component: LayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent }
    ]
  },
  { path: '**', component: ErrorComponent }
];
