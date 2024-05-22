import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { SocialComponent } from '../social/social.component';

const AngularModule = [FormsModule, RouterLink];
const MdbModule = [MdbFormsModule];
const ComponentModule = [SocialComponent]
@Component({
  selector: 'pm-login',
  standalone: true,
  imports: [AngularModule, MdbModule, ComponentModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
  handleSubmit() {

  }
}
