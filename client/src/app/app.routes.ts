import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { ErrorComponent } from './core/components/error/error.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { ProjectComponent } from './core/components/project/project.component';
import { ProtectedComponent } from './core/components/protected/protected.component';
import { VerifycodeComponent } from './core/components/verifycode/verifycode.component';
export const routes: Routes = [
  {
    path: 'auth', component: ProtectedComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'verify-user', component: VerifycodeComponent },
    ]
  },
  {
    path: '',
    component: LayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'project', component: ProjectComponent }
    ]
  },
  { path: '**', component: ErrorComponent }
];
