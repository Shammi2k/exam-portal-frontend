import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { RoleGuard } from './role.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { Role } from './models/role.model';
import { ProfileComponent } from './pages/profile/profile.component';

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
        canActivate: [RoleGuard],
        data: { roles: [Role.ADMIN] },
        children: [
            {
                path: "profile",
                component: ProfileComponent
            }
        ]
    },
    {
        path: "user-dashboard",
        component: UserDashboardComponent,
        canActivate: [RoleGuard],
        data: { roles: [Role.ADMIN, Role.NORMAL] },
        children: [
            {
                path: "profile",
                component: ProfileComponent
            }
        ]
    },
    {
        path: "access-denied",
        component: AccessDeniedComponent,
        pathMatch: 'full'
    }
];
