import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Http } from '../../../shared/http/http.service';
import { UserService } from '../../../shared/user/user.service';
const AngularModule = [FormsModule]
const MdbModule = [MdbFormsModule, MdbValidationModule, ReactiveFormsModule]
@Component({
  selector: 'pm-verifycode',
  standalone: true,
  imports: [MdbModule, AngularModule],
  templateUrl: './verifycode.component.html',
  styleUrl: './verifycode.component.scss'
})
export class VerifycodeComponent {
  http = inject(Http)
  user = inject(UserService)
  maxLength = 4;
  waiting = false
  code = new FormControl(null, [Validators.maxLength(4), Validators.minLength(4), Validators.required, this.validateNumber()])
  constructor(
    private cookie: CookieService,
  ) { }
  validateNumber() {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log(control)
      return null
    }
  }
  handleSubmitCode() {
    this.code.markAllAsTouched()
    this.waiting = true
    const userId = this.user.getUserId()
    this.http.post('/auth/verify-otp', { otp: this.code.value, userId }).subscribe(res => {
      this.code.setValue(null)
      this.waiting = false
      console.log(res)
    })
  }
}
