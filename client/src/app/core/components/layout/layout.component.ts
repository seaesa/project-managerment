import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'pm-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(private router: Router) { }
  ngDoCheck() {
    const url = this.router.url
    if (url === '/')
      this.router.navigateByUrl('/dashboard')
  }
}
