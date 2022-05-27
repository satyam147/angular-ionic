import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {UserModel} from './user.model';
import {Storage} from '@ionic/storage-angular';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  userSubject = new BehaviorSubject<UserModel | null>(null);
  constructor(private http: HttpClient,private storage: Storage, private router: Router){
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/auth/login', {
      email, password
    });
  }

  async autoLogin() {
    const user = this.storage.get('user');
    if (user) {
      const user_json = JSON.parse(await user);
      const authUser = new UserModel();
      authUser.email = user_json.email;
      authUser.id = user_json.id;
      authUser.name = user_json.name;
      authUser.token = user_json.token;
      this.userSubject.next(authUser);
      this.router.navigate(['/home']);
    }
  }
}
