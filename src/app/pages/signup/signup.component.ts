import { Component } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public user = new User();

  constructor(private userService: UserService) { }

  /**
   * onSubmit
   */
  public onSubmit() {
    if (this.user.username == null || this.user.username == '') {
      alert("Username must not be empty");
      return;
    }
    const userObserver: Observer<any> = {
      next: response => {
        alert("Success!");
        console.log('User registered successfully', response);
        // Handle successful registration (e.g., navigate to another page or show a success message)
      },
      error: error => {
        alert("Error registering user");
        console.error('Error registering user', error);
        // Handle registration error
      },
      complete: () => {
        console.log('User registration request completed');
      }
    };
    this.userService.registerUser(this.user).subscribe(userObserver);
  }
}
