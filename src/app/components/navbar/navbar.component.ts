import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MatMenuModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private loginService: LoginService, private router: Router) { }

  isLoggedIn(): boolean {
    return this.loginService.isUserLogged();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  getUser(): User | null {
    return this.loginService.getUser();
  }
}
