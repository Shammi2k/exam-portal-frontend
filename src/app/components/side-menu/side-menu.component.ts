import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SideMenuItem } from '../../models/side-menu-item.model';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    RouterModule,
    MatCardModule
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  @Input() menuItems !: Array<SideMenuItem>;

  constructor(private loginService: LoginService, private router: Router) { }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
