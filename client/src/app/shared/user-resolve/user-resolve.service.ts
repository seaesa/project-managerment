import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Http } from '../http/http.service';
import { UserService } from '../user/user.service';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolveService implements Resolve<any> {
  http = inject(Http)
  user = inject(UserService)
  newUser: any
  constructor(private cookie: CookieService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userToken = this.cookie.get('user')
    if (userToken) {
      this.http.post('/auth/current-user', { token: userToken }).subscribe((res: any) => {
        return res.user
      })
    }
  }
}
