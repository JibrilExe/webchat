import { Injectable } from '@angular/core';
import { ApiService } from './apicaller.service';
import { User } from '../login/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  logged_in:boolean = false
  username:string = ""

  constructor(private api:ApiService) { }

  create(user:User):Observable<any>{
    return this.api.addUser(user)

  }

  login(user:User):Observable<User>{
    return this.api.getUserPass(user.username)
  }
}
