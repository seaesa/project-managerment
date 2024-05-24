import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { SocialComponent } from '../social/social.component';
import { Http } from '../../../shared/http/http.service';
import { CookieService } from 'ngx-cookie-service';

const AngularModule = [FormsModule, RouterLink, ReactiveFormsModule];
const MdbModule = [MdbFormsModule, MdbValidationModule];
const ComponentModule = [SocialComponent]
@Component({
  selector: 'pm-login',
  standalone: true,
  imports: [AngularModule, MdbModule, ComponentModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private cookie: CookieService
  ) {
    this.validationForm = this.builder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  /**
   * @GET : method in this class get value in form group
   */
  get email() {
    return this.validationForm.get('email')!
  }
  get password() {
    return this.validationForm.get('password')!
  }
  handleSubmit() {
    this.validationForm.markAllAsTouched()
    this.waiting = true;
    this.http.post('/auth/login', this.validationForm.value).subscribe((res: any) => {
      if (!res.error) {
        this.waiting = false
        this.cookie.set('user', res.token, { path: '/' })
        this.router.navigateByUrl('/')
      }
    })
  }
}
