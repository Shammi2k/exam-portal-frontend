import { Component } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Observer } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


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

  constructor(private userService: UserService, private _snackBar: MatSnackBar) { }

  /**
   * onSubmit
   */
  public onSubmit() {
    const config: MatSnackBarConfig = {
      duration: 3000
    }
    if (this.user.username == null || this.user.username == '') {
      this._snackBar.open('Username cannot be empty', 'Close', config);
      return;
    }
    const userObserver: Observer<any> = {
      next: (response: User) => {
        Swal.fire("Success", `User <b>${response.username}</b> registered successfully!`, 'success');
        console.log('User registered successfully', response);
        // Handle successful registration (e.g., navigate to another page or show a success message)
      },
      error: error => {
        this._snackBar.open('Error registering user', 'Close', config);
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
