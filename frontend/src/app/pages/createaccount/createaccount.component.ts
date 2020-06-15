import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {

  user = {} as User;
  response: string;

  constructor(private authServices: AuthService, private userAuthService: UserAuthService) {
    this.response = '';
  }

  ngOnInit(): void {
  }

  createNewAccount() {
    this.response = 'Criando...';
    this.userAuthService.createAccount(this.user).subscribe((res) => {
      if (res.status) {
        this.login();
      } else {
        this.response = 'Essa conta já existe.';
      }
    });
  }

  login() {
    this.authServices.login(this.user).subscribe((res) => {
      this.response = 'Logando...';
      this.authServices.authenticate(res);
    });
  }

}
