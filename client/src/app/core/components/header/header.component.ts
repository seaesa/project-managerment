import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { UserService } from '../../../shared/user/user.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

const AngularModule = [RouterLink, CommonModule]
const MdbModule = [MdbDropdownModule, MdbRippleModule, MdbFormsModule];

@Component({
  selector: 'pm-header',
  standalone: true,
  imports: [MdbModule, AngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userService = inject(UserService)
  user: any
  constructor(
    private cookie: CookieService,
    private router: Router,
  ) {
  }
  handleLogOut() {
    this.cookie.delete('user')
    this.router.navigateByUrl('/auth/login')
  }
  ngDoCheck() {
    if (!this.user) {
      console.log(this.user)
      this.user = this.userService.getUser()
    }
  }
}
