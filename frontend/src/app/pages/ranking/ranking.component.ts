import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  users: User[];

  constructor(private rankingService: RankingService) {
    this.getUsers();
  }

  ngOnInit(): void {
  }

  getUsers() {
    this.rankingService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

}
