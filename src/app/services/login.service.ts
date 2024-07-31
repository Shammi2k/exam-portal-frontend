import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../models/userdetails.model';
import baseUrl from '../helper';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

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
}
