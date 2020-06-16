import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-redirectrofile',
  templateUrl: './redirectrofile.component.html'
})
export class RedirectrofileComponent implements OnInit {

  constructor(private UserService: UserService, private router: Router) {
    this.user();
  }

  ngOnInit(): void {
  }

  private user() {
    this.UserService.getUserMe().subscribe((res) => {
      this.router.navigate(['profile/' + res.id])
    });
  }

}
