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
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'verify-user', component: VerifycodeComponent },
    ]
  },
  {
    path: '',
    component: LayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'project', component: ProjectComponent, children: [
          { path: ':id', component: ProjectDetailComponent }
        ]
      },
      { path: 'report', component: ReportComponent },
      { path: 'settings', component: SettingComponent },
      { path: 'analytics', component: AnalyticComponent },
    ]
  },
  { path: '**', component: ErrorComponent }
];
