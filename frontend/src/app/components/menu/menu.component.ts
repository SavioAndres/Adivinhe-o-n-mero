import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  authenticated: boolean;

  constructor(private authService: AuthService) {
    this.authenticated = authService.userIsAuthenticated();
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('auth');
    window.location.replace('/login');
  }

}
