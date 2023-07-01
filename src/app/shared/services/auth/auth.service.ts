import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, IUserReq, ROLE } from '../../interfaces/user';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = `${environment.API.users}`;
  public authSubject = new Subject<boolean>();
  private admin = false;
  private logged = false;
  constructor(private auth: Auth,
    private fr: Firestore,
    private router: Router) { }

  get isAdmin(): boolean {
    return this.admin;
  }

  get isLogged(): boolean {
    return this.logged;
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    const uid = credential.user.uid;
    const docRef = doc(this.fr, this.api, uid);
    docData(docRef).subscribe((user) => {
      const currentUser = { ...user, uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.logged = true;
      if (user['role'] === ROLE.USER) this.router.navigateByUrl('/kabinet');
      if (user['role'] === ROLE.ADMIN) {
        this.admin = true;
        this.router.navigateByUrl('/admin');
      }
      this.authSubject.next(true);
    },
      (e) => {
        console.error('subscribe error', e);
      }
    )
  }

  async register(email: string, password: string, userData: IUserReq): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = credential.user.uid;
    const user = {
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      tel: userData.tel,
      role: ROLE.USER,
      orders: [],
    }
    const docRef = doc(this.fr, this.api, uid);
    setDoc(docRef, user)
      .then(() => {
        const currentUser = { ...user, uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.logged = true;
        this.authSubject.next(true);
        this.router.navigateByUrl('/kabinet');
      })
      .catch((e) => {
        console.error('setDoc', e);
      })
  }

  logout(): void{
    localStorage.removeItem('currentUser');
    this.authSubject.next(false);
  }
}
