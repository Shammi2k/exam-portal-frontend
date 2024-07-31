import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserDetails } from '../../models/userdetails.model';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Observer } from 'rxjs';
import { LoginResponse } from '../../models/loginresponse.model';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Role } from '../../models/role.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public userdetails = new UserDetails();

  constructor(private loginService: LoginService, private _snackBar: MatSnackBar, private router: Router) { }

  public onLogin() {
    const config: MatSnackBarConfig = {
      duration: 3000
    }
    if (this.userdetails.username == null || this.userdetails.username.trim() == '') {
      this._snackBar.open('Username cannot be empty', 'Close', config);
      return;
    }
    if (this.userdetails.password == null || this.userdetails.password.trim() == '') {
      this._snackBar.open('Password cannot be empty', 'Close', config);
      return;
    }

    const currentUserObserver: Observer<any> = {
      next: (user: User) => {
        this.loginService.setUser(user);
        this.loginService.navigateToDashboard();
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        console.log("Current user fetched");

      }
    }

    const loginObserver: Observer<any> = {
      next: (response: LoginResponse) => {
        this.loginService.setToken(response.token);
        this.loginService.getCurrentUser().subscribe(currentUserObserver);
      },
      error: error => {
        console.log(error);
        this._snackBar.open('Login failed', 'Close', config);
      },
      complete: () => {
        console.log("Login token generated");
      }
    }
    // Request to server to generate token
    this.loginService.generateToken(this.userdetails).subscribe(loginObserver);
  }
}
