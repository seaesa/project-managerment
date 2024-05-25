import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Http } from '../../../shared/http/http.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'pm-protected',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './protected.component.html',
  styleUrl: './protected.component.scss'
})
export class ProtectedComponent {
  http = inject(Http)
  constructor(
    private cookie: CookieService,
    private router: Router
  ) { }
  ngDoCheck() {
    const user = this.cookie.check('user');
    if (user) this.router.navigateByUrl('/');
  }
}
