import { Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { ErrorComponent } from './core/components/error/error.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { ProjectComponent } from './core/components/project/project.component';
import { ProtectedComponent } from './core/components/protected/protected.component';
import { VerifycodeComponent } from './core/components/verifycode/verifycode.component';
import { ReportComponent } from './core/components/report/report.component';
import { SettingComponent } from './core/components/setting/setting.component';
import { AnalyticComponent } from './core/components/analytic/analytic.component';
import { ProjectDetailComponent } from './core/components/project-detail/project-detail.component';
export const routes: Routes = [
  {
    path: 'auth', component: ProtectedComponent, children: [
      { path: 'login', title: 'Login', component: LoginComponent },
      { path: 'signup', title: 'Signup', component: SignupComponent },
      { path: 'verify-user', title: 'Verify', component: VerifycodeComponent },
    ]
  },
  {
    path: '', component: LayoutComponent, children: [
      { path: 'dashboard', title: 'Dashboard', component: DashboardComponent },
      {
        path: 'project', title: 'Project', component: ProjectComponent, children: [
          { path: ':id', component: ProjectDetailComponent }
        ]
      },
      { path: 'report', title: 'Report', component: ReportComponent },
      { path: 'settings', title: 'Settings', component: SettingComponent },
      { path: 'analytics', title: 'Analytics', component: AnalyticComponent },
    ]
  },
  { path: '**', title: 'Error', component: ErrorComponent }
];
