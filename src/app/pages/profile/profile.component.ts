import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { User } from '../../models/user.model';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User | null;

  constructor(loginService: LoginService) {
    this.user = loginService.getUser();
  }
}
