import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { AuthResponse } from '../models/authResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticatedUser: boolean = false;
  private url: string;

  constructor(private router: Router, private httpClient: HttpClient) {
    this.url = 'http://localhost:8000';
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  login(user: User) : Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.url + '/login', user, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  authenticate(authResponse: AuthResponse) {
    if (authResponse.status) {
     localStorage.setItem('auth', JSON.stringify(
       { status: authResponse.status, 
         token: authResponse.api_key
       }));
     this.authenticatedUser = true;
     //this.router.navigate(['/']);
     window.location.replace('/');
   } else {
     this.authenticatedUser = false;

   }
 }

 authentic(auth: AuthResponse) {
  if (auth.status) {
    this.authenticatedUser = true;
  }
}

userIsAuthenticated() : boolean {
  return this.authenticatedUser;
}

handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Erro ocorreu no lado do client
    errorMessage = error.error.message;
  } else {
    // Erro ocorreu no lado do servidor
    errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
  }
  return throwError(errorMessage);
};

}
