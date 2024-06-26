import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SocialComponent } from '../social/social.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Http } from '../../../shared/http/http.service';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { UserService } from '../../../shared/user/user.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

const AngularModule = [RouterLink, ReactiveFormsModule];
const MdbModule = [MdbFormsModule, MdbValidationModule];
const ComponentModule = [SocialComponent];
const AntModule = [NzMessageModule];

@Component({
  selector: 'pm-signup',
  standalone: true,
  imports: [ComponentModule, AngularModule, MdbModule, AntModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  declare validationForm: FormGroup
  http = inject(Http)
  user = inject(UserService)
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
    private message: NzMessageService
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
    if (this.validationForm.invalid)
      this.validationForm.markAllAsTouched()
    else {
      this.waiting = true
      this.http.post('/auth/register', this.validationForm.value).subscribe((res: any) => {
        if (!res.error) {
          this.waiting = false
          this.user.setUserId(res.userId)
          this.router.navigateByUrl('/auth/verify-user')
        } else {
          this.message.error(res.message)
          this.waiting = false
        }
      })
    }
  }
}
