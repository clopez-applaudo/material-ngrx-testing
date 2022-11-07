import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  login(credentials: string): Observable<boolean> {
    return this.http.post<boolean>('www.google.com', credentials);
  } 
}