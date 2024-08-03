import { Component } from '@angular/core';
import { SideMenuComponent } from "../../../components/side-menu/side-menu.component";
import { SideMenuItem } from '../../../models/side-menu-item.model';
import { RouterModule } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    SideMenuComponent,
    RouterModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  getMenuItems(): Array<SideMenuItem> {
    return Array.from([
      new SideMenuItem("home", "Home", "/admin-dashboard"),
      new SideMenuItem("person", "Profile", "/admin-dashboard/profile"),
      new SideMenuItem("category", "Categories", "/admin-dashboard/profile"),
      new SideMenuItem("quiz", "Quizzes", "/admin-dashboard/profile"),
    ]);
  }
}
