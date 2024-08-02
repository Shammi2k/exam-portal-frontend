import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SideMenuItem } from '../../models/side-menu-item.model';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

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
}
