import { Component } from '@angular/core';
import { AuthResponse } from './models/authResponse';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Adivinhe-o-numero';

  constructor(private authService: AuthService) {
    let currentTokenUser: string = localStorage.getItem('auth-token');

    if (currentTokenUser !== null) {
      authService.authentic(true);
    } else {
      authService.authentic(false);
    }
  }

}
