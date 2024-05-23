import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';


const MdbModule = [MdbRippleModule];
const AngularModule = [RouterLink]
@Component({
  selector: 'pm-sidebar',
  standalone: true,
  imports: [MdbModule, AngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  sidebar = [
    {
      name: 'dashboard',
      link: '/dashboard',
      icon: 'fa-solid fa-house me-2'
    },
    {
      name: 'project',
      link: '/project',
      icon: 'fa-solid fa-bars-progress me-2'
    },
    {
      name: 'analytics',
      link: '/analytics',
      icon: 'fa-solid fa-chart-simple me-2'
    },
    {
      name: 'report',
      link: '/report',
      icon: 'fa-solid fa-flag me-2'
    },
    {
      name: 'settings',
      link: '/settings',
      icon: 'fa-solid fa-gear me-2'
    },
  ]
}
