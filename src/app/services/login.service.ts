import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../models/userdetails.model';
import baseUrl from '../helper';
import { User } from '../models/user.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginSubject: Subject<boolean>;
  constructor(private http: HttpClient, private router: Router) {
    this.loginSubject = new BehaviorSubject<boolean>(this.isUserLogged());
  }

  public generateToken(userdetails: UserDetails) {
    return this.http.post(`${baseUrl}/generate-token`, userdetails);
  }

  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public isUserLogged(): boolean {
    if (this.getToken() == undefined || this.getToken() == null || this.getToken() == '') {
      return false;
    }
    return true;
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginSubject.next(false);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  public setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.loginSubject.next(true);
  }

  public getAuthority(user: User): string {
    return user.authorities[0].authority;
  }

  public checkRoleForCurrentUser(role: string): boolean {
    const user: User | null = this.getUser();
    if (!user) {
      return false;
    }
    const userRole: string = this.getAuthority(user);
    return role == userRole;
  }

  public navigateToDashboard(): boolean {
    if (this.checkRoleForCurrentUser(Role.ADMIN)) {
      this.router.navigate(['/admin-dashboard']);
    }
    else if (this.checkRoleForCurrentUser(Role.NORMAL)) {
      this.router.navigate(['/user-dashboard']);
    }
    else {
      this.router.navigate(['/access-denied']);
      return false;
    }
    return true;
  }
}
