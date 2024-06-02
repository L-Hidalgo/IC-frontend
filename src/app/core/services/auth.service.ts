import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { delay, map} from "rxjs/operators";
import * as moment from "moment";
import { environment } from "../../../environments/environment";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    @Inject("LOCALSTORAGE") private localStorage: Storage
  ) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<any>(`${environment.apiIcBack}/api/login`, { username, password })
      .pipe(
        map((response) => {
          if (response && response.status && response.token) {
            this.localStorage.setItem(
              "currentUser",
              JSON.stringify({
                token: response.token,
                isAdmin: true,
                usernamme: response.user.username,
                id: response.user.id,
                alias: response.user.email.split("@")[0],
                expiration: moment().add(1, "days").toDate(),
                fullName: response.user.name,
                role: response.user.role,
              })
            );
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout(): void {
    this.localStorage.removeItem("currentUser");
  }

  getCurrentUser(): any {
    const currentUserString = this.localStorage.getItem("currentUser");
    if (currentUserString) {
      return JSON.parse(currentUserString);
    } else {
      return null;
    }
  }

  //esto viene de la plantilla
  passwordResetRequest(email: string): Observable<boolean> {
    return of(true).pipe(delay(1000));
  }

  changePassword(
    email: string,
    currentPwd: string,
    newPwd: string
  ): Observable<boolean> {
    return of(true).pipe(delay(1000));
  }

  passwordReset(
    email: string,
    token: string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
    return of(true).pipe(delay(1000));
  }
}
