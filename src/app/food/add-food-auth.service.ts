import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../users/auth.service";

@Injectable()
export class AddFoodAuthService {
    admin;
    constructor(private router: Router, private user: AuthService) {
    }
    canActivate(route: ActivatedRouteSnapshot) {
        if (this.user.currentUser === undefined) {
            return false;
        }
        this.admin = this.user.currentUser.admin === true;
        if (!this.admin) {
            this.router.navigate(["/food"]);
            return false;
        }
        return true;
    }
}
