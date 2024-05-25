import { Component, afterNextRender, afterRender, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { UserService } from '../../../shared/user/user.service';
import { CommonModule } from '@angular/common';

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
  // declare user: {
  //   id: string,
  //   email: string,
  //   username: string,
  //   [key: string]: string | null
  // }
  user = this.userService.getUser()
  constructor() {

  }
  ngDoCheck() {
    // this.user = this.userService.getUser()
    console.log(this.user)
  }
}
