import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  user = {} as User;
  message: string;

  constructor(private userService: UserService) {
    this.getUser();
  }

  ngOnInit(): void {
  }

  private getUser() {
    this.userService.getUserMe().subscribe((res) => {
      this.user = res;
    });
  }

  updateAccount() {
    this.userService.upUserMe(this.user).subscribe((res) => {
      if(res.status) {
        this.message = 'Atualizado com sucesso.';
      } else {
        this.message = 'Erro ao atualizar';
      }
    });
  }

  deleteAccount() {
    this.userService.delUserMe().subscribe((res) => {
      if (res.status) {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('start');
        window.location.replace('/');
      }
    });
  }

}
