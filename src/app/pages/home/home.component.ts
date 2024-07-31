import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.loginSubject.asObservable().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  navigateToLogin(): void {
    this.router.navigate(['login']);
  }

  navigateToDashboard(): void {
    this.loginService.navigateToDashboard();
  }
}
