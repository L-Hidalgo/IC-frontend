import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { AuthenticationService } from "../services/auth.service";
import { UserRole } from "src/app/shared/models/enum/user-role.enum";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
    constructor(
      private authService: AuthenticationService,
      private router: Router
    ) {}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      const expectedRoles = next.data["expectedRoles"] as Array<UserRole>;
  
      const currentUser = this.authService.getCurrentUser();
  
      if (currentUser && expectedRoles.includes(currentUser.role)) {
        return true;
      } else {
        this.router.navigate(['auth/login']);
        return false;
      }
    }
  }
  
