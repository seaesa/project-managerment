import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SocialComponent } from '../social/social.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

const AngularModule = [RouterLink];
const MdbModule = [MdbFormsModule];
const ComponentModule = [SocialComponent];
@Component({
  selector: 'pm-signup',
  standalone: true,
  imports: [ComponentModule, AngularModule, MdbModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  social = [
    {
      icon: 'fab fa-facebook-f'
    },
    {
      icon: 'fab fa-google'
    },
    {
      icon: 'fab fa-twitter'
    },
    {
      icon: 'fab fa-github'
    },
  ]
}
