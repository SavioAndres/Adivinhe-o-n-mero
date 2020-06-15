import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {} as User;
  response: string;

  constructor(private authServices: AuthService) {
    this.response = '';
  }

  ngOnInit(): void {

  }

  login() {
    this.response = 'Logando...';
    this.authServices.login(this.user).subscribe((res) => {
      if (res.status) {
        this.authServices.authenticate(res);
      } else {
        this.response = 'Login incorreto.';
      }
    });
  }

}
