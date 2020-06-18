import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Score } from '../models/score';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = 'http://localhost:8000';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('auth-token'),
    })
  };

  getUserMe(): Observable<User> {
    return this.httpClient.get<User>(this.url + '/user', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.url + '/user/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getScores(id: number): Observable<Score[]> {
    return this.httpClient.get<Score[]>(this.url + '/scoresuser/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  upUserMe(user: User): Observable<User> {
    return this.httpClient.put<User>(this.url + '/updateaccount', user, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  delUserMe(): Observable<User> {
    return this.httpClient.delete<User>(this.url + '/deleteaccount', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
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
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
