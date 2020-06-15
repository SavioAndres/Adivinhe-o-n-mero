import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { Play } from '../models/play';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class PlayService {
  private url: string = 'http://localhost:8000';

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    cookieService.set('lumen_session', 'BArDt9kwvg9Zu7tvtEvmj1wEQdqGqCp2L02Unrir')
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('auth-token'),
    })
  };

  play(play: Play): Observable<Play> {
    return this.httpClient
      .post<Play>(
        this.url + '/play',
        play,
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
