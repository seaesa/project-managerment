import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

const AngularModule = [RouterLink]
const MdbModule = [MdbDropdownModule, MdbRippleModule, MdbFormsModule];

@Component({
  selector: 'pm-header',
  standalone: true,
  imports: [MdbModule, AngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
