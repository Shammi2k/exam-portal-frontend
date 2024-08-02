import { Component } from '@angular/core';
import { SideMenuComponent } from "../../../components/side-menu/side-menu.component";
import { SideMenuItem } from '../../../models/side-menu-item.model';
import { RouterModule } from '@angular/router';

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
      new SideMenuItem("person", "Profile", "/admin-dashboard/profile")
    ]);
  }
}
