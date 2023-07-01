import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, IUserReq } from '../../interfaces/user';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = `${environment.BACK_URL}${environment.API.users}`;
  public logoutSubject = new Subject<void>();
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<IUser[]>{
   return this.http.get<IUser[]>(`${this.api}?email=${email}&password=${password}`);
  }

  register(user: IUserReq): Observable<IUser>{
    return this.http.post<IUser>(this.api, user);
  }

  logout(): void{
    localStorage.removeItem('currentUser');
    this.logoutSubject.next();
  }
}
