import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginService} from './login.service';
import {UserModel} from './user.model';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: LoginService,private router: Router, private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
  }

  login(form: NgForm){
    // this.errorMessage = '';
    this.authService.login(form.value.email, form.value.password)
      .subscribe((res) => {
          const response = res as {
            email: string;
            id: string;
            name: string;
            token: string;
          };
          const user = new UserModel();
          user.email = response.email;
          user.id = response.id;
          user.name = response.name;
          user.token = response.token;
          this.authService.userSubject.next(user);
          this.storage.set('user',JSON.stringify(user));
          this.router.navigate(['/home']);
        },
        error => {
          // this.errorMessage = error.error;
        });
  }
}
