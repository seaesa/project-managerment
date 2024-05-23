import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SocialComponent } from '../social/social.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Http } from '../../services/http.service';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

const AngularModule = [RouterLink, ReactiveFormsModule];
const MdbModule = [MdbFormsModule, MdbValidationModule];
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
  constructor(
    private builder: FormBuilder,
    private router: Router,
  ) {
    this.validationForm = this.builder.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.compareTwoArg('password', 'confirmPassword') })
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
  get confirmPassword() {
    return this.validationForm.get('confirmPassword')!
  }
  compareTwoArg(value: string, valueRefer: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const password = formGroup.get(value)
      const confirmPassword = formGroup.get(valueRefer)
      if ((password?.value === confirmPassword?.value)) {
        confirmPassword?.invalid || confirmPassword?.setErrors(null)
      } else {
        confirmPassword?.invalid || confirmPassword?.setErrors({ matched: true })
      }
      return null
    }
  }

  handleSubmit() {
    this.validationForm.markAllAsTouched()
    this.waiting = true
    this.http.post('/auth/login', this.validationForm.value).subscribe((res: any) => {
      if (res.ok && !res.error) {
        this.waiting = false
        this.router.navigateByUrl('/auth/verify-user')
      } else {
        console.log(res)
      }
    })
  }
}
