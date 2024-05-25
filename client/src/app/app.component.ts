import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Http } from './shared/http/http.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './shared/user/user.service';
@Component({
  selector: 'pm-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  http = inject(Http);
  user = inject(UserService)
  constructor(private cookie: CookieService, private router: Router) { }
  ngOnInit() {
    const userToken = this.cookie.get('user')
    if (userToken) {
      this.http.post('/auth/current-user', { token: userToken }).subscribe((res: any) => {
        if (res.error) {
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