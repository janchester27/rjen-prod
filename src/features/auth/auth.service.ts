import { Injectable } from '@angular/core';
import { catchError, map, retry, throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../app/environments/environment.development';

//Interface for environment where the endpoints are.
interface Environment {
  production: boolean;
  apiURL: string;
  tkn: string;
  user_id: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  environmentTyped = environment as Environment;

  token:any;
  LoginURL = this.environmentTyped.apiURL + 'cashier/login'


  constructor(private http: HttpClient) {
    this.token = sessionStorage.getItem('item')
   }

  // this funtion is used tp create an HTTP headers object.
  getHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  }

  Login(form: any): Observable<any> {
    return this.http.post<any>(this.LoginURL, form, this.getHeaders()).pipe(
      map((data) => {
        console.log(data, "Login success");
        return data;
      }),
      catchError((error) => this.handleError(error))
    );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was:`, error.error
      );
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  setSessionData(data: any): void {
    if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('user_id', data.user_id);
    }
  }
}
