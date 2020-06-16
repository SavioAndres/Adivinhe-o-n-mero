import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {} as User;
  private idUser: number;

  constructor(private userService: UserService, private _route: ActivatedRoute) {
    this.idUser = Number(this._route.snapshot.paramMap.get('id'));
    this.getUser();
  }

  ngOnInit(): void {
  }

  getUser() {
    this.userService.getUser(this.idUser).subscribe((res) => {
      this.user = res;
    });
  }

}
