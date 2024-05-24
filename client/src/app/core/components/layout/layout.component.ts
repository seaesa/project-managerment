import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Http } from '../../../shared/http/http.service';
import { UserService } from '../../../shared/user/user.service';

@Component({
  selector: 'pm-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  http = inject(Http)
  user = inject(UserService)
  constructor(
    private router: Router,
    private cookie: CookieService
  ) { }
  ngDoCheck() {
    const url = this.router.url
    if (url === '/')
      this.router.navigateByUrl('/dashboard')
  }
  ngOnInit() {
    const userToken = this.cookie.get('user')
    if (userToken) {
      this.http.post('/auth/current-user', { token: userToken }).subscribe((res: any) => {
        if (res.error) {
          console.log(res)
          this.cookie.delete('user')
          this.router.navigateByUrl('/auth/login')
        } else {
          this.user.setUser(res.user)
        }
      })
    }
    else {
      this.router.navigateByUrl('/auth/login')
    }
  }
}
