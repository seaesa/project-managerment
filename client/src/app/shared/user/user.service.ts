import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  declare private userId: string
  declare user: {
    id: string,
    email: string,
    username: string,
    [key: string]: string | null
  }
  constructor() { }
  setUserId(id: string) {
    this.userId = id
  }
  getUserId() {
    return this.userId
  }
  getUser() {
    return this.user
  }
  setUser(object: any) {
    this.user = object
  }
}
