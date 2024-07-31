import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./services/login.service";

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        const roles = route.data["roles"] as Array<string>;
        if (roles && !roles.some(role => this.loginService.checkRoleForCurrentUser(role))) {
            this.router.navigate(["/access-denied"]);
            return false;
        }

        return true;
    }

}