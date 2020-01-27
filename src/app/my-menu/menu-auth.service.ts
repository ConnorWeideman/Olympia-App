import { Injectable } from "@angular/core";
import { AuthService } from "../users/auth.service";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class MenuAuthService {
    constructor(private authService: AuthService, private router: Router) {
    }
    canActivate() {
        if (this.authService.loggedIn()) {
            return true;
        }
        this.router.navigate(["/food"]);
        return false;
    }
}
