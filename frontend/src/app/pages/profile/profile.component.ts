import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Score } from 'src/app/models/score';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = {} as User;
  scores: Score[];
  private idUser: number;

  constructor(private userService: UserService, private _route: ActivatedRoute) {
    this.idUser = Number(this._route.snapshot.paramMap.get('id'));
    this.getUser();
    this.getScores();
  }

  ngOnInit(): void {
  }

  getUser() {
    this.userService.getUser(this.idUser).subscribe((res: User) => {
      this.user = res;
    });
  }

  getScores() {
    this.userService.getScores(this.idUser).subscribe((res: Score[]) => {
      this.scores = res;
      console.log(res)
    });
  }

}
