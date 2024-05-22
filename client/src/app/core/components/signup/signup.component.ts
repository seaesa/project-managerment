import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SocialComponent } from '../social/social.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Http } from '../../services/http.service';

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
  declare validationForm: FormGroup
  http = inject(Http)
  waiting = false
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
  constructor(private builder: FormBuilder) {
    this.validationForm = this.builder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
}
