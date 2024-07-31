import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { RoleGuard } from './role.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { Role } from './models/role.model';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: "signup",
        component: SignupComponent,
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: "admin-dashboard",
        component: AdminDashboardComponent,
        pathMatch: 'full',
        canActivate: [RoleGuard],
        data: { roles: [Role.ADMIN] }
    },
    {
        path: "user-dashboard",
        component: UserDashboardComponent,
        pathMatch: 'full',
        canActivate: [RoleGuard],
        data: { roles: [Role.ADMIN, Role.NORMAL] }
    },
    {
        path: "access-denied",
        component: AccessDeniedComponent,
        pathMatch: 'full'
    }
];
